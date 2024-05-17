import { Transaction } from './transaction';
import { User } from './user';

export type Shift = {
    id: number;
    user_id: number;
    start_time: Date;
    end_time?: Date;
    initial_cash: number;
    final_cash?: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    Transaction: Transaction[];
};
