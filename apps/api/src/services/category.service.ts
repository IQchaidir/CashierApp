import prisma from '@/prisma';
import { resBadRequest, resCreated, resNotFound, resSuccess } from '@/utils/responses';

export class CategoryService {
    async createCategory(name: string) {
        const existingCategory = await prisma.category.findUnique({
            where: { name },
        });
        if (existingCategory) {
            return resBadRequest('Category already exist');
        }
        const category = await prisma.category.create({
            data: { name },
        });
        return resCreated(category);
    }

    async getCategory(pageNumber: number) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const categories = await prisma.category.findMany({
            where: { archive: false },
            skip: skipAmount,
            orderBy: { id: 'asc' },
        });
        if (categories.length > 0) {
            return resSuccess(categories);
        }
        return resNotFound('Category not Found ');
    }

    async deleteCategory(id: number) {
        const productsWithCategory = await prisma.product.findMany({
            where: {
                category: { id },
            },
        });

        if (productsWithCategory.length > 0) {
            return resBadRequest('Cannot delete category because it is associated with existing products');
        }

        const deleteCategory = await prisma.category.update({
            where: { id },
            data: { archive: true },
        });
        if (!deleteCategory) {
            return resNotFound('category not found');
        }
        return resSuccess('success delete category');
    }
}
