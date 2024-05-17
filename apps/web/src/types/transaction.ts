import { Product } from './product';
import { Shift } from './shift';
import { User } from './user';

export type Transaction = {
    id: number;
    user_id: number;
    shift_id: number;
    invoice: string;
    amount: number;
    method: string;
    cardNumber?: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    shift: Shift;
    Transaction_Product: Transaction_Product[];
};

export type Transaction_Product = {
    id: number;
    transaction_id: number;
    product_id: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    transaction: Transaction;
    product: Product;
};
