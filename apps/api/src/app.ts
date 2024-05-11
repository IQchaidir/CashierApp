import express, { json, urlencoded, Express, Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { CashierRouter } from './routers/cashier.router';
import { ProductRouter } from './routers/product.router';

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.configure();
        this.routes();
        this.handleError();
    }

    private configure(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
    }

    private handleError(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.path.includes('/api/')) {
                res.status(404).send('Not found !');
            } else {
                next();
            }
        });

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (req.path.includes('/api/')) {
                console.error('Error : ', err.stack);
                res.status(500).send('Error !');
            } else {
                next();
            }
        });
    }

    private routes(): void {
        const authRouter = new AuthRouter();
        const cashierRouter = new CashierRouter();
        const productRouter = new ProductRouter();

        this.app.use('/api/auth', authRouter.getRouter());
        this.app.use('/api/cashier', cashierRouter.getRouter());
        this.app.use('/api/product', productRouter.getRouter());
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
        });
    }
}
