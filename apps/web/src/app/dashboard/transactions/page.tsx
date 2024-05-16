'use client';
import { UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';

export default function TransactionDashboard() {
    const users = [
        {
            id: '1',
            user_name: 'john_doe',
            email: 'john@example.com',
            role: 'admin',
            email_verification: true,
            telephone: '123456789',
            createdAt: '2024-05-17T10:00:00Z',
        },
        {
            id: '2',
            user_name: 'jane_smith',
            email: 'jane@example.com',
            role: 'user',
            email_verification: false,
            telephone: '',
            createdAt: '2024-05-16T15:30:00Z',
        },
    ];

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Users />
                            Cashier List
                        </h2>
                        <p className="text-muted-foreground">list of all cashier</p>
                        <Link
                            href={`/dashboard/users/create`}
                            className="border bg-blue-500 p-2 cursor-pointer font-medium flex gap-2 items-center rounded-md text-white"
                        >
                            <UserPlus className="w-4 h-4 text-" />
                            Create Cashier
                        </Link>
                    </div>
                </div>
                {!!users?.length && <DataTable data={users} columns={columns} />}
            </div>
        </>
    );
}
