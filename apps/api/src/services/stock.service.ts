import prisma from '@/prisma';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';

export class StockService {
    async getStockLogProduct(id: number) {
        const logStock = await prisma.stockLog.findMany({
            where: { product_id: id },
        });
        if (logStock.length > 0) {
            return resSuccess(logStock);
        }
        return resNotFound('Logstock not found');
    }

    async checkStock(productId: number, quantity: number) {
        const productStock = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!productStock || productStock.stock < quantity) {
            return false;
        }
        return true;
    }

    async addStock(id: number, quantity: number) {
        const updateStock = await prisma.product.update({
            where: { id },
            data: { stock: { increment: quantity } },
        });
        if (!updateStock) {
            return resNotFound('Product not found');
        }
        await prisma.stockLog.create({
            data: { product_id: id, quantityChange: quantity, type: 'Addition' },
        });
        return resSuccess(updateStock);
    }

    async reduceStock(id: number, quantity: number) {
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return resNotFound('Product not found');
        }

        if (quantity > existingProduct.stock) {
            return resBadRequest('Qty must be less than or equals to stock');
        }

        const updateStock = await prisma.product.update({
            where: { id },
            data: { stock: { decrement: quantity } },
        });

        await prisma.stockLog.create({
            data: { product_id: id, quantityChange: quantity, type: 'Reduction' },
        });

        return resSuccess(updateStock);
    }
}
