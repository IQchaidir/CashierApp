'use client';
import { Plus, ScrollText, UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';
import CreateCategory from './components/CreateCategory';

export default function CategoriesDashboard() {
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
                            <ScrollText />
                            Category List
                        </h2>
                        <p className="text-muted-foreground">list of all category</p>
                        <CreateCategory />
                    </div>
                </div>
                {!!users?.length && <DataTable data={users} columns={columns} />}
            </div>
        </>
    );
}
