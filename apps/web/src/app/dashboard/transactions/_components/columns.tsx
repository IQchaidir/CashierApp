'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DetailTransactionSheet } from './DetailTransactionSheet';
import { Transaction } from '@/types/transaction';
import { formatToRupiah } from '@/utils/formatToRupiah';

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
        cell: ({ row }) => <div className="w-[20px]">{row.getValue('id')}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'invoice',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice" />,
        cell: ({ row }) => {
            const transaction = row.original;
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        <DetailTransactionSheet transaction={transaction} invoice={row.getValue('invoice')} />
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'method',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Method Payment" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.getValue('method')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{formatToRupiah(row.getValue('amount'))}</span>
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
];
