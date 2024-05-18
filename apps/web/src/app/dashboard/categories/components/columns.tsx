'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { ArrowDownIcon, CircleIcon, CircleHelp } from 'lucide-react';
import CategoryAction from './CategoryAction';

export type Users = {
    id: string;
    name: string;
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
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
            const category = row.original;
            return (
                <div className="flex justify-center">
                    <CategoryAction id={Number(category.id)} name={category.name} />
                </div>
            );
        },
    },
];