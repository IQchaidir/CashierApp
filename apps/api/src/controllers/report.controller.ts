import { NextFunction, Request, Response } from 'express';
import { ReportService } from '@/services/report.service';

export class ReportController {
    async getSalesProductData(req: Request, res: Response, next: NextFunction) {
        const reportService = new ReportService();
        const { start_date, end_date } = req.query;
        try {
            const data = await reportService.getSalesProductData(start_date as string, end_date as string);
            return res.status(data.status).json(data.response);
        } catch (error) {
            next(error);
        }
    }

    async getDailySalesAmount(req: Request, res: Response, next: NextFunction) {
        const reportService = new ReportService();
        const { start_date, end_date } = req.query;
        try {
            const data = await reportService.getDailySalesAmount(start_date as string, end_date as string);
            return res.status(data.status).json(data.response);
        } catch (error) {
            next(error);
        }
    }
}
