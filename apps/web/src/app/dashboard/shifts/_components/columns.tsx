'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { formatToRupiah } from '@/utils/formatToRupiah';
import { Shift } from '@/types/shift';
import { DetailShiftSheet } from './DetailShiftSheet';

export const columns: ColumnDef<Shift>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
        cell: ({ row }) => <div className="w-[20px]">{row.getValue('id')}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'start_time',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Shift" />,
        cell: ({ row }) => {
            const shift = row.original;
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        <DetailShiftSheet
                            shift={shift}
                            start_time={new Date(row.getValue('start_time')).toLocaleString('en-US')}
                        />
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'cashier',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Cashier" />,
        cell: ({ row }) => {
            const shift = row.original;
            return (
                <div className="flex items-center">
                    <span>{shift.user.user_name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'totalAmount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Transaction" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{formatToRupiah(row.getValue('totalAmount'))}</span>
                </div>
            );
        },
    },
];
