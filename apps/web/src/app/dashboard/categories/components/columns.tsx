'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { ArrowDownIcon, CircleIcon, CircleHelp } from 'lucide-react';

export type Users = {
    id: string;
    user_name: string;
    email: string;
    role: string;
    email_verification: boolean;
    telephone: string | '';
    createdAt: string;
};

export const roles = [
    {
        value: 'Customer',
        label: 'Customer',
        icon: CircleHelp,
    },
    {
        value: 'Store_Admin',
        label: 'Store Admin',
        icon: CircleIcon,
    },
    {
        value: 'Super_Admin',
        label: 'Super Admin',
        icon: ArrowDownIcon,
    },
];

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
        cell: ({ row }) => <div className="w-[20px]">{row.getValue('id')}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'user_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue('user_name')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.getValue('email')}</span>
                </div>
            );
        },
    },

    {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-sm">
                        {new Date(row.getValue('createdAt')).toLocaleString('en-US')}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const role = row.getValue('role');

            return role == 'Store_Admin' && <DataTableRowActions row={row} />;
        },
    },
];
