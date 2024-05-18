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
        this.router.get('/', this.productController.getProductAdmin);
        this.router.get('/cashier', this.productController.getProductCashier);
        this.router.get('/:id', this.productController.getProductById);
        this.router.post(
            '/',
            verifyToken,
            verifyAdmin,
            uploader('IMG', '/images').single('file'),
            this.productController.createProduct,
        );
        this.router.patch(
            '/update/:id',
            verifyToken,
            verifyAdmin,
            uploader('IMG', '/images').single('file'),
            this.productController.updateProduct,
        );
        this.router.delete('/:id', verifyToken, verifyAdmin, this.productController.deleteProduct);
    }

    getRouter(): Router {
        return this.router;
    }
}
