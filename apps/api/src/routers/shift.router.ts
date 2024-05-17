import { ShiftController } from '@/controllers/shift.controller';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class ShiftRouter {
    private router: Router;
    private shiftController: ShiftController;

    constructor() {
        this.shiftController = new ShiftController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.shiftController.getShift);
        this.router.post('/check', verifyToken, this.shiftController.checkShift);
        this.router.get('/:id', this.shiftController.getShiftById);
        this.router.post('/', verifyToken, this.shiftController.startShift);
        this.router.patch('/end/:id', verifyToken, this.shiftController.endShift);
    }

    getRouter(): Router {
        return this.router;
    }
}
