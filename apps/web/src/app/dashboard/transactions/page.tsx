'use client';
import { UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';

export default function TransactionDashboard() {
    const users = [
        {
            id: '1',
            invoice: 'INV-12313123-01',
            method: 'CASH',
            amount: 8000,
            createdAt: '2024-05-17T10:00:00Z',
        },
        {
            id: '2',
            invoice: 'INV-12313123-02',
            method: 'DEBIT',
            amount: 9000,
            createdAt: '2024-05-17T10:00:00Z',
        },
    ];

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Users />
                            Transaction List
                        </h2>
                        <p className="text-muted-foreground">list of all transaction</p>
                    </div>
                </div>
                {!!users?.length && <DataTable data={users} columns={columns} />}
            </div>
        </>
    );
}
