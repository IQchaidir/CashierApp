import { AuthController } from '@/controllers/auth.controller';
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
    }

    getRouter(): Router {
        return this.router;
    }
}
