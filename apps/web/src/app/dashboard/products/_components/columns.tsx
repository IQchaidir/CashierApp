'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import Link from 'next/link';
import { Product } from '@/types/product';

export const columns: ColumnDef<Product>[] = [
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
            const product = row.original;
            return (
                <Link href={`/dashboard/products/${product.id}`}>
                    <div className="flex space-x-2">
                        <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
                    </div>
                </Link>
            );
        },
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => <DataTableColumnHeader column={column} title="stock" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-sm">{row.getValue('stock')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => <DataTableColumnHeader column={column} title="category" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-sm">{row.getValue('category')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="price" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate text-sm">{row.getValue('price')}</span>
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
