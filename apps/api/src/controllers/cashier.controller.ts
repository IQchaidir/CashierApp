import { CashierService } from '@/services/cashier.service';
import { NextFunction, Request, Response } from 'express';

export class CashierController {
    async getCashier(req: Request, res: Response, next: NextFunction) {
        const pageNumber = parseInt((req.query.page as string) || '1');
        const { search: email } = req.query;
        const cashierService = new CashierService();
        try {
            const cashier = await cashierService.getCashier(pageNumber, email as string);
            return res.status(cashier.status).json(cashier.response);
        } catch (error) {
            next(error);
        }
    }

    async getCashierById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const cashierService = new CashierService();
        try {
            const cashier = await cashierService.getCashierById(Number(id));
            return res.status(cashier.status).json(cashier.response);
        } catch (error) {
            next(error);
        }
    }

    async createCashier(req: Request, res: Response, next: NextFunction) {
        const { email, password, user_name } = req.body;
        const cashierService = new CashierService();
        try {
            const newCashier = await cashierService.createCashier(email, password, user_name);
            return res.status(newCashier.status).json(newCashier.response);
        } catch (error: any) {
            return next(error);
        }
    }

    async updateCashier(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { user_name, email, password } = req.body;
        const cashierService = new CashierService();
        try {
            const updateCashier = await cashierService.updateCashier(Number(id), user_name, email, password);
            return res.status(updateCashier.status).json(updateCashier.response);
        } catch (error) {
            next(error);
        }
    }

    async deleteCashier(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const cashierService = new CashierService();

        try {
            const deleteCashier = await cashierService.deleteCashiser(Number(id));
            return res.status(deleteCashier.status).json(deleteCashier.response);
        } catch (error) {
            next(error);
        }
    }
}
