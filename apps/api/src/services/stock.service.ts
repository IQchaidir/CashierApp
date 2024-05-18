import prisma from '@/prisma';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';

export class StockService {
    async reduceStockTransaction(id: number, quantity: number, tx: any) {
        await tx.product.update({
            where: { id },
            data: { stock: { decrement: quantity } },
        });
        return;
    }

    async checkStock(productId: number, quantity: number) {
        const productStock = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!productStock || productStock.stock === null || productStock.stock < quantity) {
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

        return resSuccess(updateStock);
    }

    async reduceStock(id: number, quantity: number) {
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return resNotFound('Product not found');
        }

        if (existingProduct.stock === null || quantity > existingProduct.stock) {
            return resBadRequest('Qty must be less than or equals to stock');
        }

        const updateStock = await prisma.product.update({
            where: { id },
            data: { stock: { decrement: quantity } },
        });

        return resSuccess(updateStock);
    }
}
