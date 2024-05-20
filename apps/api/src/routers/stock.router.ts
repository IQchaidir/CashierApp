import { StockController } from '@/controllers/stock.controller';
import { editStockValidator } from '@/middleware/validator';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class StockRouter {
    private router: Router;
    private stockController: StockController;

    constructor() {
        this.stockController = new StockController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.patch('/add/:id', verifyToken, verifyAdmin, editStockValidator, this.stockController.addStock);
        this.router.patch(
            '/reduce/:id',
            verifyToken,
            verifyAdmin,
            editStockValidator,
            this.stockController.reduceStock,
        );
    }

    getRouter(): Router {
        return this.router;
    }
}
