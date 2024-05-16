'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { History, Minus, Trash2 } from 'lucide-react';

import Link from 'next/link';
import AddStock from './AddStock';
import ReduceStock from './ReduceStock';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const products: any = row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghostedit" className=" text-black flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>
                    <Link
                        href={`/dashboard/stores/${products?.storeId}/inventories/${products?.productId}`}
                        className="flex items-center gap-2"
                    >
                        <History className="w-4 h-4" />
                        View Stocklog
                    </Link>
                </DropdownMenuItem>
                <div className="flex flex-col items-start p-2 gap-2">
                    <AddStock
                        productId={products?.productId}
                        storeId={products?.storeId}
                        quantity={products?.quantity}
                    />
                    <ReduceStock
                        productId={products?.productId}
                        storeId={products?.storeId}
                        quantity={products?.quantity}
                    />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span className="text-red-500 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
