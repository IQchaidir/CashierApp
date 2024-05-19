import { Transaction } from './transaction';
import { User } from './user';

export type Shift = {
    id: number;
    user_id: number;
    start_time: string;
    end_time: string;
    initial_cash: string;
    final_cash: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    Transaction: Transaction[];
    user_name: string;
    totalTransactions: number;
    totalCash: number;
    totalDebit: number;
    totalAmount: number;
};
