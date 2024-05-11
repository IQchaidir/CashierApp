import prisma from '@/prisma';
import { Prisma, Shift } from '@prisma/client';

export class ShiftService {
    async getShift(whereClause: Prisma.ShiftWhereInput = {}, pageSize: number, skipAmount: number) {
        let shift: Shift[] = [];
        const getShift = await prisma.shift.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: {
                start_time: 'asc',
            },
        });
        if (getShift.length > 0) {
            shift = getShift;
        }
        return { status: 200, response: { data: shift, message: 'get all shift' } };
    }

    async getShiftById(id: number) {
        const shift = await prisma.shift.findUnique({
            where: { id },
            include: { Transaction: true },
        });

        if (!shift) {
            return { status: 400, response: { message: 'shift not found' } };
        }

        const cashTransaction = shift.Transaction.filter((transaction) => transaction.method === 'CASH');
        const debitTransaction = shift.Transaction.filter((transaction) => transaction.method === 'DEBIT');

        const totalCash = cashTransaction.reduce((total, transaction) => total + Number(transaction.amount), 0);
        const totalDebit = debitTransaction.reduce((total, transaction) => total + Number(transaction.amount), 0);

        const shiftWithTotals = {
            ...shift,
            totalCash,
            totalDebit,
        };

        return { status: 200, response: { data: shiftWithTotals, message: 'success get shift' } };
    }

    async checkShift() {}

    async startShift(initialCash: number, id: number) {
        const user = await prisma.user.findFirst({
            where: { id },
        });

        if (!user) {
            return { status: 400, response: { message: 'user not found' } };
        }

        const shift = await prisma.shift.create({
            data: { user_id: id, initial_cash: initialCash },
        });
        return { status: 200, response: { data: shift, message: 'shift created' } };
    }

    async endShift(finalCash: number, id: number) {
        const shift = await prisma.shift.findFirst({
            where: { id },
        });

        if (!shift) {
            return { status: 400, response: { message: 'shift not found' } };
        }
        const endShift = await prisma.shift.update({
            where: { id },
            data: { final_cash: finalCash, end_time: new Date().toISOString() },
        });
        return { status: 200, response: { data: endShift, message: 'shift ended' } };
    }
}
