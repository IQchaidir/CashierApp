import { AuthController } from '@/controllers/auth.controller';
import { cashierValidator } from '@/middleware/validator';
import { verifyAdmin } from '@/middleware/verifyAdmin';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/login', this.authController.login);
        this.router.get('/logout', verifyToken, this.authController.logout);
        this.router.post('/create-admin', cashierValidator, this.authController.createAdmin);
    }

    getRouter(): Router {
        return this.router;
    }
}
