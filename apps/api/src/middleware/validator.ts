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
            return res.status(400).send('all form required');
        }

        next();
    },
];

export const updateCashierValidator = [
    body('password').custom((value, { req }) => {
        if (!value) {
            return true;
        }
        return isStrongPassword(value);
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errorValidator = validationResult(req);
        if (!errorValidator.isEmpty()) {
            return res.status(400).send('password required');
        }
        next();
    },
];

function isStrongPassword(password: string) {
    return body('password')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            minUppercase: 1,
        })
        .run({ body: { password } });
}

export const editStockValidator = [
    body('quantity').isInt({ min: 1 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('qty must be greater than 0');
        }
        next();
    },
];

export const transactionValidator = [
    body('method').notEmpty().withMessage('Method is required'),
    body('products').isArray({ min: 1 }).withMessage('Products array is required'),
    body('products.*.productId').isInt().withMessage('Product ID must be an integer'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('metode pembayaran harus dipilih');
        }
        next();
    },
];

export const categoryValidator = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('required name');
        }
        next();
    },
];

export const createShiftValidator = [
    body('initial_cash')
        .notEmpty()
        .exists()
        .withMessage('Initial cash is required')
        .isFloat({ min: 0 })
        .withMessage('Initial cash must be a non-negative number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('total uang kas harus diisi');
        }
        next();
    },
];

export const endShiftValidator = [
    body('final_cash')
        .notEmpty()
        .exists()
        .withMessage('Initial cash is required')
        .isFloat({ min: 0 })
        .withMessage('Initial cash must be a non-negative number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('total uang kas harus diisi');
        }
        next();
    },
];

export const productValidator = [
    body('name').notEmpty().isString().withMessage('name is required'),
    body('description').notEmpty().isString().withMessage('description is required'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a non-negative number'),
    body('category')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt()
        .withMessage('Category ID must be an integer'),
    body('weight')
        .notEmpty()
        .withMessage('Weight is required')
        .isFloat({ min: 0 })
        .withMessage('Weight must be a non-negative number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('semua data harus terisi!');
        }
        next();
    },
];

export const updateProductValidator = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('category').optional().isInt().withMessage('Category ID must be an integer'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a non-negative number'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('Error Validation');
        }
        next();
    },
];
