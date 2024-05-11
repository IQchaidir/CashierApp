import { NextFunction, Request, Response } from 'express';

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req?.dataUser?.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'Unauthorized on this endpoint' });
        }
        next();
    } catch (error) {
        return res.status(400).send('Token error');
    }
};
