import prisma from '@/prisma';
import { calculateTotalAmount } from '@/utils/calculateTotalAmount';
import { filterDate } from '@/utils/filterDate';
import { formattedUtcDate } from '@/utils/formatUtcDate';
import { resBadRequest, resNotFound, resSuccess, resUnauthorized } from '@/utils/responses';
import { Prisma } from '@prisma/client';

export class ShiftService {
    async getShift(pageNumber: number, dateFilter?: string, startDate?: string, endDate?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        let whereClause: Prisma.ShiftWhereInput = { final_cash: { not: null }, end_time: { not: null } };

        // if (dateFilter) {
        //     let result;
        //     if (startDate && endDate) {
        //         result = filterDate(dateFilter, startDate, endDate);
        //     } else {
        //         result = filterDate(dateFilter);
        //     }

        //     if (typeof result === 'object' && result !== null) {
        //         const { filterStartDate, filterEndDate } = result;
        //         whereClause.createdAt = {
        //             gte: filterStartDate,
        //             lte: filterEndDate,
        //         };
        //     }
        // }

        const getShift = await prisma.shift.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: {
                start_time: 'asc',
            },
        });
        if (getShift.length > 0) {
            return resSuccess(getShift);
        }
        return resNotFound('Shift not found');
    }

    async getShiftById(id: number) {
        const shift = await prisma.shift.findUnique({
            where: { id },
            include: { Transaction: true },
        });

        if (!shift) {
            return resNotFound('Shift not found');
        }
        const totalTransactions = shift.Transaction.length;
        const cashTransaction = shift.Transaction.filter((transaction) => transaction.method === 'CASH');
        const debitTransaction = shift.Transaction.filter((transaction) => transaction.method === 'DEBIT');

        const totalCash = calculateTotalAmount(cashTransaction);
        const totalDebit = calculateTotalAmount(debitTransaction);
        const totalAmount = totalCash + totalDebit;

        const shiftWithTotals = {
            ...shift,
            totalTransactions,
            totalCash,
            totalDebit,
            totalAmount,
        };

        return resSuccess(shiftWithTotals);
    }

    async checkShift(id: number) {
        const activeShift = await prisma.shift.findFirst({
            where: {
                user_id: { not: id },
                start_time: { lte: new Date() },
                end_time: null,
            },
            include: {
                Transaction: true,
                user: true,
            },
        });

        let currentShift;

        currentShift = await prisma.shift.findFirst({
            where: {
                user_id: id,
                end_time: null,
            },
            include: {
                Transaction: true,
                user: true,
            },
        });
        if (currentShift) {
            const cashTransaction = currentShift.Transaction.filter((transaction) => transaction.method === 'CASH');
            const debitTransaction = currentShift.Transaction.filter((transaction) => transaction.method === 'DEBIT');

            const totalCash = calculateTotalAmount(cashTransaction);
            const totalDebit = calculateTotalAmount(debitTransaction);
            const totalAmount = totalCash + totalDebit;

            currentShift = { ...currentShift, totalAmount, totalCash, totalDebit };
        }

        return { activeShift, currentShift };
    }

    async startShift(initial_cash: number, id: number) {
        const user = await prisma.user.findFirst({
            where: { id },
        });

        if (!user) {
            return resNotFound('User not found');
        }

        const checkShift = await this.checkShift(id);

        if (checkShift.activeShift) {
            return resBadRequest('there is still an ongoing shift');
        }
        if (checkShift.currentShift) {
            return resBadRequest('there is still an ongoing shift');
        }

        const shift = await prisma.shift.create({
            data: { user_id: id, initial_cash: initial_cash },
        });
        return resSuccess(shift);
    }

    async endShift(userId: number, id: number, final_cash: number) {
        const existingShift = await prisma.shift.findFirst({
            where: { id, user_id: userId },
        });
        if (!existingShift) {
            return resUnauthorized('Hanya bisa diakhiri oleh kasir yang membuat shift!');
        }
        const shift = await prisma.shift.update({
            where: { id: existingShift.id },
            data: { final_cash, end_time: new Date().toISOString() },
        });

        return resSuccess(shift);
    }
}
