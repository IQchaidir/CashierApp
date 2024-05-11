import prisma from '@/prisma';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';
import { Prisma, Product } from '@prisma/client';

export class ProductService {
    async createProduct(
        file: string | undefined,
        name: string,
        description: string,
        price: number,
        stock: number,
        categoryId: number,
    ) {
        if (!file) {
            return resBadRequest('No image uploaded');
        }

        const existingProduct = await prisma.product.findUnique({
            where: { name },
        });

        if (existingProduct) {
            return resBadRequest('product already exist');
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                category_id: categoryId,
                image: process.env.BASE_URL + 'images/' + file,
            },
        });

        return resSuccess(newProduct);
    }

    async getProduct(category?: string, name?: string) {
        let products: Product[] = [];
        const whereClause: Prisma.ProductWhereInput = { archive: false };

        if (category) {
            whereClause.category = { name: category };
        }

        if (name) {
            whereClause.name = name ? { contains: name } : undefined;
        }

        const product = await prisma.product.findMany({
            where: whereClause,
        });
        if (product.length > 0) {
            products = product;
            return resSuccess(products);
        }
        return resNotFound('product not found');
    }

    async getProductById(id: number) {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            return { status: 400, response: { message: 'product not found' } };
        }
        return { status: 200, response: { data: product, message: 'succes get product' } };
    }

    async updateProduct(
        id: number,
        file?: string,
        name?: string,
        description?: string,
        price?: number,
        category?: string,
    ) {
        const existingName = await prisma.product.findUnique({
            where: { name, NOT: { id: Number(id) } },
        });
        if (existingName) {
            return { status: 400, response: { message: 'product name already exist' } };
        }

        const updateData: any = { name, price, description, category: { connect: { name: category } } };

        const imageUrl = file ? process.env.BASE_URL + 'images/' + file : undefined;
        if (imageUrl) {
            updateData.image = imageUrl;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
        });
        if (!updatedProduct) {
            return { status: 400, response: { message: 'product not foud' } };
        }
        return { status: 200, repsonse: { data: updatedProduct, message: 'success update product' } };
    }

    async archiveProduct(id: number) {
        const deleteProduct = await prisma.product.update({
            where: { id },
            data: { archive: true },
        });
        if (!deleteProduct) {
            return { status: 400, response: { message: 'product not found' } };
        }
        return { status: 200, response: { message: 'success delete product' } };
    }
}
