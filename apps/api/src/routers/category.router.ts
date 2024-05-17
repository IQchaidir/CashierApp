import { CategoryController } from '@/controllers/category.controller';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class CategoryRouter {
    private router: Router;
    private categoryController: CategoryController;

    constructor() {
        this.categoryController = new CategoryController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.categoryController.getCategory);
        this.router.post('/', verifyToken, verifyAdmin, this.categoryController.createCategory);
        this.router.delete('/delete/:id', verifyToken, verifyAdmin, this.categoryController.deleteCategory);
    }

    getRouter(): Router {
        return this.router;
    }
}
