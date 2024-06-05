import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { ShiftService } from '@/services/shift.service';

export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const authService = new AuthService();
        try {
            const login = await authService.login(email, password);
            return res.status(login.status).json(login.response);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const id = req.dataUser.id;
        const shiftService = new ShiftService();
        try {
            const checkShift = await shiftService.checkShift(id);
            if (checkShift.currentShift) {
                return res.status(200).json('shift');
            }
            return res.status(200).json('logout');
        } catch (error) {
            next(error);
        }
    }
}
