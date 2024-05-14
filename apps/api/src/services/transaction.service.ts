import prisma from '@/prisma';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';
import { Prisma } from '@prisma/client';
import { ShiftService } from './shift.service';
import { StockService } from './stock.service';
import ProductService from './product.service';
import { formattedUtcDate } from '@/utils/formatUtcDate';
import productService from './product.service';

export class TransactionService {
    async getLatestId() {
        const latestTransaction = await prisma.transaction.findFirst({
            orderBy: { id: 'desc' },
        });
        if (latestTransaction) return latestTransaction.id;
    }

    async createTransaction(
        userId: number,
        shiftId: number,
        amount: number,
        method: string,
        products: { productId: number; quantity: number; price: number }[],
        cardNumber?: string,
    ) {
        const shiftService = new ShiftService();
        const stockService = new StockService();

        const checkShift = await shiftService.checkShift(userId);
        if (checkShift.activeShift) {
            return resBadRequest('there is still an ongoing shift');
        } else if (!checkShift.currentShift) {
            return resBadRequest('Create a new shift first');
        }

        for (const product of products) {
            const avaliableProduct = await productService.checkProduct(product.productId);
            if (!avaliableProduct) {
                return resBadRequest(`Product ${product.productId} not found`);
            }
            const availableStock = await stockService.checkStock(product.productId, product.quantity);
            if (!availableStock) {
                return resBadRequest(`Product ${product.productId} is not available in sufficient quantity`);
            }
        }

        let invoice;
        const transactionLatestId = await this.getLatestId();
        if (transactionLatestId) {
            invoice = `INV-${Date.now()}-${transactionLatestId + 1}`;
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
                await tx.transaction_Product.create({
                    data: {
                        transaction_id: createTransaction.id,
                        product_id: product.productId,
                        quantity: product.quantity,
                        price: product.price,
                    },
                });
                await stockService.reduceStockTransaction(product.productId, product.quantity, tx);
            }
            return createTransaction;
        });
        return resSuccess(newTransaction);
    }

    async getTransaction(pageNumber: number, startDate?: string, endDate?: string) {
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

        const getShift = await prisma.transaction.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: {
                id: 'asc',
            },
        });
        if (getShift.length > 0) {
            return resSuccess(getShift);
        }
        return resNotFound('Shift not found');
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
