import { ReportController } from '@/controllers/report.controller';
import { StockController } from '@/controllers/stock.controller';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class ReportRouter {
    private router: Router;
    private reportController: ReportController;

    constructor() {
        this.reportController = new ReportController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/transaction', verifyToken, verifyAdmin, this.reportController.getDailySalesAmount);
        this.router.get('/product', verifyToken, verifyAdmin, this.reportController.getSalesProductData);
    }

    getRouter(): Router {
        return this.router;
    }
}
