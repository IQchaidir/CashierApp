import prisma from '@/prisma';
import { hashPassword } from '@/lib/hashPassword';
import { resBadRequest, resCreated, resNotFound, resSuccess } from '@/utils/responses';
import { User } from '@prisma/client';

export class CashierService {
    async createCashier(email: string, password: string, user_name: string) {
        const existingEmail = await prisma.user.findFirst({
            where: { email, archive: false },
        });

        if (existingEmail) {
            return resBadRequest('Email already use');
        }

        const hashed = await hashPassword(password);

        const newCashier = await prisma.user.create({
            data: { email, password: hashed, role: 'CASHIER', user_name },
        });
        return resCreated(newCashier);
    }

    async getCashier(pageNumber: number) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const getCashier = await prisma.user.findMany({
            where: { role: 'CASHIER', archive: false },
            skip: skipAmount,
            orderBy: { id: 'asc' },
        });

        if (getCashier.length > 0) {
            return resSuccess(getCashier);
        }
        return resNotFound('cashier not found');
    }

    async getCashierById(id: number) {
        const cashier = await prisma.user.findUnique({
            where: { id, archive: false },
        });

        if (!cashier) {
            return resNotFound('Cashier not found');
        }

        return resSuccess(cashier);
    }

    async updateCashier(id: number, email?: string, password?: string) {
        let newData: { email?: string; password?: string } = {};

        if (email) {
            const existingEmail = await prisma.user.findFirst({
                where: { email, archive: false },
            });
            if (existingEmail) {
                return resBadRequest('email already use');
            }
            newData.email = email;
        }

        if (password) {
            const hashedPassword = await hashPassword(password);
            newData.password = hashedPassword;
        }
        const cashier = await prisma.user.update({
            where: { id },
            data: newData,
        });
        if (!cashier) {
            return resNotFound('Cashier not found');
        }

        return resSuccess(cashier);
    }

    async deleteCashiser(id: number) {
        const cashier = await prisma.user.update({
            where: { id },
            data: { archive: true },
        });
        if (!cashier) {
            return resNotFound('Cashier not found');
        }

        return resSuccess('success delete');
    }
}
