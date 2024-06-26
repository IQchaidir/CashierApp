import prisma from '@/prisma';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { formatToDateTimeString, formattedUtcDate } from '@/utils/formatUtcDate';
import { resBadRequest, resSuccess } from '@/utils/responses';

export class ReportService {
    async getSalesProductData(startDate?: string, endDate?: string) {
        const whereClause: any = {};
        let startUtcDate;
        let endUtcDate;

        if (startDate && endDate) {
            startUtcDate = formattedUtcDate(startDate);
            endUtcDate = formattedUtcDate(endDate, true);
        }

        whereClause.createdAt = {
            gte: startUtcDate,
            lte: endUtcDate,
        };

        const salesData = await prisma.transaction_Product.groupBy({
            by: ['product_id'],
            _count: {
                product_id: true,
            },
            _sum: {
                quantity: true,
            },
            where: whereClause,
        });

        const productIds = salesData.map((data) => data.product_id);
        const products = await prisma.product.findMany({
            where: {
                id: { in: productIds },
            },
            select: {
                id: true,
                name: true,
            },
        });

        const result = salesData.map((data) => {
            const product = products.find((product) => product.id === data.product_id);
            return {
                productName: product?.name || 'Unknown',
                count: data._sum.quantity,
            };
        });

        if (!result.length) {
            return resBadRequest('Data not found');
        }

        return resSuccess(result);
    }

    async getDailySalesAmount(startDate?: string, endDate?: string) {
        const whereClause: any = {};
        let startUtcDate;
        let endUtcDate;

        if (startDate && endDate) {
            startUtcDate = formattedUtcDate(startDate);
            endUtcDate = formattedUtcDate(endDate, true);
        }
        whereClause.createdAt = {
            gte: startUtcDate,
            lte: endUtcDate,
        };

        const salesData = await prisma.transaction.groupBy({
            by: ['createdAt'],
            _sum: {
                amount: true,
            },
            where: whereClause,
        });

        const dailySales: { [date: string]: number } = {};
        salesData.forEach((data) => {
            const date = data.createdAt.toISOString().split('T')[0];
            const totalAmount = Number(data._sum.amount);
            if (dailySales[date]) {
                dailySales[date] += totalAmount;
            } else {
                dailySales[date] = totalAmount;
            }
        });

        const result = Object.keys(dailySales).map((date) => ({
            date: date,
            totalAmount: dailySales[date],
        }));

        if (!result.length) {
            return resBadRequest('Data not found');
        }

        return resSuccess(result);
    }
}
