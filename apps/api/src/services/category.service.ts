import prisma from '@/prisma';
import { resBadRequest, resCreated, resNotFound, resSuccess } from '@/utils/responses';

export class CategoryService {
    async createCategory(name: string) {
        const existingCategory = await prisma.category.findFirst({
            where: { name, archive: false },
        });
        if (existingCategory) {
            return resBadRequest('Category already exist');
        }
        const category = await prisma.category.create({
            data: { name },
        });
        return resCreated(category);
    }

    async getCategory(pageNumber: number, name?: string) {
        const pageSize = 10;
        const skipAmount = (pageNumber - 1) * pageSize;
        const whereClause: any = { archive: false };

        if (name) {
            whereClause.name = name ? { contains: name } : undefined;
        }

        const totalCount = await prisma.product.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);

        const categories = await prisma.category.findMany({
            where: whereClause,
            skip: skipAmount,
            take: pageSize,
            orderBy: { id: 'asc' },
        });
        if (categories.length > 0) {
            return resSuccess({ category: { categories, totalPages } });
        }
        return resNotFound('Category not Found ');
    }

    async updateCategory(id: number, name: string) {
        const checkName = await prisma.category.findFirst({
            where: { name, archive: false, NOT: { id } },
        });

        if (checkName) {
            return resBadRequest('Category already exist');
        }
        const updateCategory = await prisma.category.update({
            where: { id },
            data: { name },
        });
        if (!updateCategory) {
            resBadRequest('gagal mengupdate kategori');
        }
        return resSuccess(updateCategory);
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
