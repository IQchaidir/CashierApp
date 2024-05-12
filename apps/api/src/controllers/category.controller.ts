import { CategoryService } from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';

export class CategoryController {
    async createCategory(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        const categoryService = new CategoryService();

        try {
            const newCategory = await categoryService.createCategory(name);
            return res.status(newCategory.status).json(newCategory.response);
        } catch (error) {
            next(error);
        }
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        const pageNumber = parseInt((req.query.page as string) || '1');
        const categoryService = new CategoryService();

        try {
            const categories = await categoryService.getCategory(pageNumber);
            return res.status(categories.status).json(categories.response);
        } catch (error) {
            next();
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const categoryService = new CategoryService();

        try {
            const deleteCategory = await categoryService.deleteCategory(Number(id));
            return res.status(deleteCategory.status).json(deleteCategory.response);
        } catch (error) {
            next(error);
        }
    }
}
