import prisma from '@/prisma';

export class ReportService {
    async getDailySalesTotal(startDate: Date, endDate: Date) {
        const totalTransactions = await prisma.transaction.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    }

    async getDailyItemSalesTotal(startDate: Date, endDate: Date) {
        const dailyItemSales = await prisma.transaction_Product.groupBy({
            by: ['createdAt', 'product_id'],
            _sum: { quantity: true },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    }
    async getDailyAmountTotal(startDate: Date, endDate: Date) {
        const dailyAmountTotal = await prisma.transaction.groupBy({
            by: ['createdAt'],
            _sum: { amount: true },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    }
}
