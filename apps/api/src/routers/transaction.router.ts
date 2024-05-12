import { TransactionController } from '@/controllers/transaction.controller';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class TransactionRouter {
    private router: Router;
    private transactionController: TransactionController;

    constructor() {
        this.transactionController = new TransactionController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.transactionController.getTransaction);
        this.router.get('/:id', this.transactionController.getTransactionById);
        this.router.post('/create/:shiftId', verifyToken, this.transactionController.createTransaction);
    }

    getRouter(): Router {
        return this.router;
    }
}
