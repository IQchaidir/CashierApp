'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { User } from '@/types/user';

export const columns: ColumnDef<User>[] = [
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
            return <DataTableRowActions row={row} />;
        },
    },
];
