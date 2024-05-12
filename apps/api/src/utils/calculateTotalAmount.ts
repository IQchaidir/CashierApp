import { Transaction } from '@prisma/client';

export function calculateTotalAmount(transactions: Transaction[]): number {
    return transactions.reduce((total, transaction) => total + Number(transaction.amount), 0);
}
