import prisma from '@/prisma';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';
import { Prisma } from '@prisma/client';
import { StockService } from './stock.service';
import { formattedUtcDate } from '@/utils/formatUtcDate';
import productService from './product.service';
import { ShiftService } from './shift.service';

export class TransactionService {
    async getLatestTransaction() {
        const latestTransaction = await prisma.transaction.findFirst({
            orderBy: { id: 'desc' },
        });
        if (latestTransaction) return latestTransaction;
    }

    async getShiftTransaction(id: number, pageNumber: number, payment?: string, invoice?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const whereClause: any = { shift: { user_id: id, end_time: null } };

        if (payment) {
            whereClause.method = payment;
        }

        if (invoice) {
            whereClause.invoice = invoice ? { contains: invoice } : undefined;
        }

        const totalTransactions = await prisma.transaction.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalTransactions / pageSize);

        const transaction = await prisma.transaction.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
            include: {
                Transaction_Product: {
                    include: { product: true },
                },
                user: true,
            },
        });
        if (transaction.length > 0) {
            const data = { transaction, totalPages };
            return resSuccess(data);
        }
        return resNotFound('transaction not found');
    }

    async createTransaction(
        userId: number,
        method: string,
        products: { productId: number; quantity: number }[],
        cardNumber?: string,
    ) {
        const stockService = new StockService();
        const shiftService = new ShiftService();

        let shiftId;
        let dataProductArray: any = [];
        let amount: number = 0;

        const getShift = await shiftService.checkShift(userId);
        if (getShift.activeShift) {
            return resBadRequest('Masih ada shift yang berjalan!');
        }
        if (getShift.currentShift) {
            shiftId = getShift.currentShift?.id;
        }

        for (const product of products) {
            const availableProduct = await productService.checkProduct(product.productId);
            if (!availableProduct) {
                return resBadRequest(`Product ${product.productId} not found`);
            }
            const availableStock = await stockService.checkStock(product.productId, product.quantity);
            if (!availableStock) {
                return resBadRequest(`Product ${product.productId} is not available in sufficient quantity`);
            }
            dataProductArray.push(availableProduct);
            amount += product.quantity * Number(availableProduct.price);
        }

        let invoice;
        const transactionLatestId = await this.getLatestTransaction();
        if (transactionLatestId) {
            invoice = `INV-${Date.now()}-${transactionLatestId.id + 1}`;
        } else {
            invoice = `INV-${Date.now()}-${1}`;
        }

        let dataTransaction: any = { user_id: userId, shift_id: shiftId, invoice, amount, method };

        if (cardNumber) {
            dataTransaction.cardNumber = cardNumber;
        }

        const newTransaction = await prisma.$transaction(async (tx) => {
            const createTransaction = await tx.transaction.create({
                data: dataTransaction,
            });
            for (const product of products) {
                const productData = dataProductArray.find((p: any) => p.id === product.productId);
                if (productData)
                    await tx.transaction_Product.create({
                        data: {
                            transaction_id: createTransaction.id,
                            product_id: product.productId,
                            quantity: product.quantity,
                            price: productData.price,
                        },
                    });
                await stockService.reduceStockTransaction(product.productId, product.quantity, tx);
            }
            return createTransaction;
        });
        return resSuccess(newTransaction);
    }

    async getTransaction(pageNumber: number, startDate?: string, endDate?: string, invoice?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        let whereClause: Prisma.TransactionWhereInput = {};

        if (startDate && endDate) {
            const startUtcDate = formattedUtcDate(startDate);
            const endUtcDate = formattedUtcDate(endDate, true);

            whereClause.createdAt = {
                gte: startUtcDate,
                lte: endUtcDate,
            };
        }

        if (invoice) {
            whereClause.invoice = invoice ? { contains: invoice } : undefined;
        }

        const totalCount = await prisma.transaction.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);

        const transaction = await prisma.transaction.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
            include: {
                Transaction_Product: {
                    include: { product: true },
                },
                user: true,
            },
        });
        if (transaction.length > 0) {
            const data = { transaction, totalPages };
            return resSuccess(data);
        }
        return resNotFound('Transaction not found');
    }

    async getTransactionById(id: number) {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: { Transaction_Product: true },
        });
        if (!transaction) {
            return resNotFound('Transaction not found');
        }
        return resSuccess(transaction);
    }
}
