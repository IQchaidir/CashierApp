import { ProductService } from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        const { name, description, price, stock, categoryId } = req.body;
        const file: string | undefined = req.file?.filename;
        const productService = new ProductService();
        try {
            const createProduct = await productService.createProduct(file, name, description, price, stock, categoryId);
            return res.status(createProduct.status).json(createProduct.response);
        } catch (error) {
            next(error);
        }
    }
}
