import { ProductController } from '@/controllers/product.controller';
import { uploader } from '@/middleware/imageProduct';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class ProductRouter {
    private router: Router;
    private productController: ProductController;

    constructor() {
        this.productController = new ProductController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            '/create',
            verifyToken,
            verifyAdmin,
            uploader('IMG', '/images').single('file'),
            this.productController.createProduct,
        );
    }

    getRouter(): Router {
        return this.router;
    }
}
