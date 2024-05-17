import { ShiftService } from '@/services/shift.service';
import { NextFunction, Request, Response, response } from 'express';

export class ShiftController {
    async getShift(req: Request, res: Response, next: NextFunction) {
        const { dateFilter, startDate, endDate, page } = req.query;
        const pageNumber = parseInt((page as string) || '1');
        const shiftService = new ShiftService();

        try {
            const shift = await shiftService.getShift(
                pageNumber,
                dateFilter as string,
                startDate as string,
                endDate as string,
            );
            return res.status(shift.status).json(shift.response);
        } catch (error) {
            next(error);
        }
    }

    async getShiftById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const shiftService = new ShiftService();

        try {
            const shift = await shiftService.getShiftById(Number(id));
            return res.status(shift.status).json(shift.response);
        } catch (error) {
            next(error);
        }
    }

    async startShift(req: Request, res: Response, next: NextFunction) {
        const { initial_cash } = req.body;
        const userId = Number(req.dataUser.id);
        const shiftService = new ShiftService();

        try {
            const startShift = await shiftService.startShift(initial_cash, userId);
            return res.status(startShift.status).json(startShift.response);
        } catch (error) {
            next(error);
        }
    }

    async endShift(req: Request, res: Response, next: NextFunction) {
        const userId = req.dataUser.id;
        const { id } = req.params;
        const { final_cash } = req.body;
        const shiftService = new ShiftService();

        try {
            const endShift = await shiftService.endShift(userId, Number(id), final_cash);
            return res.status(endShift.status).json(endShift.response);
        } catch (error) {
            next(error);
        }
    }

    async checkShift(req: Request, res: Response, next: NextFunction) {
        const id = req.dataUser.id;
        const shiftService = new ShiftService();

        try {
            const checkShift = await shiftService.checkShift(id);
            if (checkShift.activeShift) {
                return res
                    .status(400)
                    .json({ message: 'Masih ada shift orang lain yang aktif!', data: checkShift.activeShift });
            } else if (!checkShift.currentShift) {
                return res.status(400).json({ message: 'Mulai shift terlebih dahulu' });
            }
            return res.status(200).json(checkShift.currentShift);
        } catch (error) {
            next(error);
        }
    }
}
