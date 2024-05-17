import { TransactionService } from '@/services/transaction.service';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
    async createTransaction(req: Request, res: Response, next: NextFunction) {
        const userId = req.dataUser.id;
        const { method, cardNumber, products } = req.body;
        const transactionService = new TransactionService();

        try {
            const transaction = await transactionService.createTransaction(
                Number(userId),
                method,
                products,
                cardNumber,
            );

            return res.status(transaction.status).json(transaction.response);
        } catch (error) {
            next(error);
        }
    }

    async getTransaction(req: Request, res: Response, next: NextFunction) {
        const { startDate, endDate, page } = req.query;
        const pageNumber = parseInt((page as string) || '1');
        const transactionService = new TransactionService();

        try {
            const transaction = await transactionService.getTransaction(
                pageNumber,
                startDate as string,
                endDate as string,
            );
            return res.status(transaction.status).json(transaction.response);
        } catch (error) {
            next(error);
        }
    }

    async getTransactionById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const transactionService = new TransactionService();

        try {
            const transaction = await transactionService.getTransactionById(Number(id));
            return res.status(transaction.status).json(transaction.response);
        } catch (error) {
            next(error);
        }
    }

    async getLatestTransaction(req: Request, res: Response, next: NextFunction) {
        const transactionService = new TransactionService();
        try {
            const latestTransaction = await transactionService.getLatestTransaction();
            return res.status(200).json(latestTransaction);
        } catch (error) {
            return next(error);
        }
    }

    async getShiftTransaction(req: Request, res: Response, next: NextFunction) {
        const id = req.dataUser.id;
        const { payment, search: invoice, page } = req.query;
        const pageNumber = parseInt(page as string, 10) || 1;
        const transactionService = new TransactionService();
        try {
            const transaction = await transactionService.getShiftTransaction(
                id,
                pageNumber,
                payment as string,
                invoice as string,
            );
            return res.status(transaction.status).json(transaction.response);
        } catch (error) {
            return next(error);
        }
    }
}
