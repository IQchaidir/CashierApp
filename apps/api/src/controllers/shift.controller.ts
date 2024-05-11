import { ShiftService } from '@/services/shift.service';
import { NextFunction, Request, Response } from 'express';

export class ShiftController {
    async startShift(req: Request, res: Response, next: NextFunction) {
        const { initialCash } = req.body;
        const userId = Number(req.dataUser.id);
        const shiftService = new ShiftService();

        try {
            const startShift = await shiftService.startShift(initialCash, userId);
            return res.status(startShift.status).json(startShift.response);
        } catch (error) {
            next(error);
        }
    }
}
