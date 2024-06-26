import { StockService } from '@/services/stock.service';
import { NextFunction, Request, Response } from 'express';

export class StockController {
    async addStock(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { quantity } = req.body;
        const stockService = new StockService();

        try {
            const updateStock = await stockService.addStock(Number(id), quantity);
            return res.status(updateStock.status).json(updateStock.response);
        } catch (error) {
            next(error);
        }
    }

    async reduceStock(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { quantity } = req.body;
        const stockService = new StockService();

        try {
            const updateStock = await stockService.reduceStock(Number(id), quantity);
            return res.status(updateStock.status).json(updateStock.response);
        } catch (error) {
            next(error);
        }
    }
}
