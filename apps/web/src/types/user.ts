import { Shift } from './shift';
import { Transaction } from './transaction';

export type User = {
    id: number;
    email: string;
    user_name: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    archive: boolean;
};
