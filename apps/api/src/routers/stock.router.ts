import { StockController } from '@/controllers/stock.controller';
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
        this.router.get('/:id', this.stockController.getStockLog);
        this.router.patch('/add/:id', verifyToken, verifyAdmin, this.stockController.addStock);
        this.router.patch('/reduce/:id', verifyToken, verifyAdmin, this.stockController.reduceStock);
    }

    getRouter(): Router {
        return this.router;
    }
}
