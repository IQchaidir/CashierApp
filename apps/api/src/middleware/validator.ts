import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const cashierValidator = [
    body('email').notEmpty().withMessage('Email Required'),
    body('password').notEmpty().withMessage('Password Required'),
    body('password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 1,
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errorValidator = validationResult(req);
        if (!errorValidator.isEmpty()) {
            return res.status(400).send({ error: errorValidator.array() });
        }

        next();
    },
];

export const updateCashierValidator = [
    body('password').notEmpty().withMessage('Password Required'),
    body('password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 1,
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errorValidator = validationResult(req);
        if (!errorValidator.isEmpty()) {
            return res.status(400).send({ error: errorValidator.array() });
        }

        next();
    },
];

export const editStockValidator = [
    body('qty').isInt({ min: 1 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'qty must be greater than 0' });
        }
        next();
    },
];
