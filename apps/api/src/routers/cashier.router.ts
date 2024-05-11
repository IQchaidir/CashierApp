import { CashierController } from '@/controllers/cashier.controller';
import { cashierValidator, updateCashierValidator } from '@/middleware/validator';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class CashierRouter {
    private router: Router;
    private cashierController: CashierController;

    constructor() {
        this.cashierController = new CashierController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', verifyToken, verifyAdmin, this.cashierController.getCashier);
        this.router.get('/:id', verifyToken, this.cashierController.getCashierById);
        this.router.post('/create', verifyToken, verifyAdmin, cashierValidator, this.cashierController.createCashier);
        this.router.patch(
            '/update/:id',
            verifyToken,
            verifyAdmin,
            updateCashierValidator,
            this.cashierController.updateCashier,
        );
        this.router.delete('/delete/:id', verifyToken, verifyAdmin, this.cashierController.deleteCashier);
    }

    getRouter(): Router {
        return this.router;
    }
}
