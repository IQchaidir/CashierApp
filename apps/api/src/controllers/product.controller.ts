import productService from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        const { name, description, price, category, weight } = req.body;
        const file: string | undefined = req.file?.filename;
        try {
            const createProduct = await productService.createProduct(
                file,
                name,
                description,
                price,
                Number(category),
                Number(weight),
            );
            return res.status(createProduct.status).json(createProduct.response);
        } catch (error) {
            next(error);
        }
    }

    async getProductAdmin(req: Request, res: Response, next: NextFunction) {
        const { search: name, category, page } = req.query;
        const pageNumber = parseInt(page as string, 10) || 1;

        try {
            const product = await productService.getProductAdmin(pageNumber, category as string, name as string);
            return res.status(product.status).json(product.response);
        } catch (error) {
            next(error);
        }
    }

    async getProductCashier(req: Request, res: Response, next: NextFunction) {
        const { search: name, category, page } = req.query;
        const pageNumber = parseInt(page as string, 10) || 1;

        try {
            const product = await productService.getProductCashier(pageNumber, category as string, name as string);
            return res.status(product.status).json(product.response);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const productById = await productService.getProductById(Number(id));
            return res.status(productById.status).json(productById.response);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, description, price, category, weight } = req.body;
        const file: string | undefined = req.file?.filename;

        try {
            const updateProduct = await productService.updateProduct(
                Number(id),
                name,
                description,
                Number(price),
                Number(category),
                file,
                Number(weight),
            );
            return res.status(updateProduct.status).json(updateProduct.response);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const deleteProduct = await productService.archiveProduct(Number(id));
            return res.status(deleteProduct.status).json(deleteProduct.response);
        } catch (error) {
            next(error);
        }
    }
}
