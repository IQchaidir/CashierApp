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

        const existingUsername = await prisma.user.findFirst({
            where: { user_name, archive: false },
        });

        if (existingUsername) {
            return resBadRequest('Username already use');
        }

        const hashed = await hashPassword(password);

        const newCashier = await prisma.user.create({
            data: { email, password: hashed, role: 'CASHIER', user_name },
        });
        return resCreated(newCashier);
    }

    async getCashier(pageNumber: number, email?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const whereClause: any = { role: 'CASHIER', archive: false };

        if (email) {
            whereClause.email = email ? { contains: email } : undefined;
        }
        const totalCount = await prisma.user.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);

        const getCashier = await prisma.user.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
        });

        if (getCashier.length > 0) {
            const data = { getCashier, totalPages };
            return resSuccess(data);
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

    async updateCashier(id: number, user_name?: string, email?: string, password?: string) {
        let newData: { email?: string; password?: string; user_name?: string } = {};

        const checkUniqueField = async (field: 'user_name' | 'email', value: string, errorMessage: string) => {
            const existingUser = await prisma.user.findFirst({
                where: {
                    [field]: value,
                    archive: false,
                    NOT: { id },
                },
            });
            if (existingUser) {
                throw new Error(errorMessage);
            }
        };

        try {
            if (user_name) {
                await checkUniqueField('user_name', user_name, 'Username already in use');
                newData.user_name = user_name;
            }

            if (email) {
                await checkUniqueField('email', email, 'Email already in use');
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
        } catch (error: any) {
            return resBadRequest(error.message);
        }
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
