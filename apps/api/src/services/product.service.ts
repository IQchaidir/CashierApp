import prisma from '@/prisma';
import { deleteExistingImage } from '@/utils/deleteExistingImage';
import { resBadRequest, resNotFound, resSuccess } from '@/utils/responses';
import { Prisma } from '@prisma/client';

class ProductService {
    async checkProduct(productId: number) {
        const product = await prisma.product.findUnique({
            where: { id: productId, archive: false },
        });
        if (!product) {
            return false;
        }
        return product;
    }

    async createProduct(
        file: string | undefined,
        name: string,
        description: string,
        price: number,
        categoryId: number,
        weight: number,
    ) {
        if (!file) {
            return resBadRequest('No image uploaded');
        }

        const existingProduct = await prisma.product.findFirst({
            where: { name, archive: false },
        });

        if (existingProduct) {
            return resBadRequest('product already exist');
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image: process.env.BASE_URL + 'images/' + file,
                category_id: categoryId,
                weight,
            },
        });

        return resSuccess(newProduct);
    }

    async getProductAdmin(pageNumber: number, category?: string, name?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const whereClause: Prisma.ProductWhereInput = { archive: false };

        if (category) {
            whereClause.category = { name: category };
        }

        if (name) {
            whereClause.name = name ? { contains: name } : undefined;
        }

        const totalCount = await prisma.product.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);

        const products = await prisma.product.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
            include: { category: { select: { name: true } } },
        });

        const formattedProducts = products.map((product) => ({
            ...product,
            category: product.category.name,
        }));

        if (formattedProducts.length > 0) {
            const data = { products: formattedProducts, totalPages };
            return resSuccess(data);
        }
        return resNotFound('Product not found');
    }

    async getProductCashier(pageNumber: number, category?: string, name?: string) {
        const pageSize = 14;
        const skipAmount = (pageNumber - 1) * pageSize;
        const whereClause: Prisma.ProductWhereInput = { archive: false, stock: { gt: 0 } };

        if (category) {
            whereClause.category = { name: category };
        }

        if (name) {
            whereClause.name = name ? { contains: name } : undefined;
        }

        const totalCount = await prisma.product.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);

        const products = await prisma.product.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
            include: { category: { select: { name: true } } },
        });

        if (products.length > 0) {
            const data = { products, totalPages };
            return resSuccess(data);
        }
        return resNotFound('Product not found');
    }

    async getProductById(id: number) {
        const getProduct = await prisma.product.findUnique({
            where: { id, archive: false },
            include: { category: { select: { name: true } } },
        });
        if (!getProduct) {
            return resNotFound('Product not found');
        }
        const product = {
            ...getProduct,
            category: getProduct.category ? getProduct.category.name : null,
        };
        return resSuccess(product);
    }

    async updateProduct(
        id: number,
        name?: string,
        description?: string,
        price?: number,
        category_id?: number,
        file?: string,
        weight?: number,
    ) {
        const existingProduct = await prisma.product.findUnique({
            where: { id, archive: false },
        });
        if (!existingProduct) {
            return resBadRequest('Product not found');
        }

        const existingName = await prisma.product.findFirst({
            where: { name, NOT: { id: Number(id) }, archive: false },
        });
        if (existingName) {
            return resBadRequest('Product already exist');
        }

        const updateData: any = { name, price, description, category_id, weight };

        const imageUrl = file ? process.env.BASE_URL + 'images/' + file : undefined;
        if (imageUrl) {
            updateData.image = imageUrl;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
        });

        if (existingProduct.image && imageUrl && existingProduct.image !== imageUrl) {
            deleteExistingImage(existingProduct.image);
        }
        return resSuccess(updatedProduct);
    }

    async archiveProduct(id: number) {
        const deleteProduct = await prisma.product.update({
            where: { id },
            data: { archive: true },
        });
        if (!deleteProduct) {
            return resBadRequest('Product not found');
        }
        return resSuccess('Success delete product');
    }
}

export default new ProductService();
