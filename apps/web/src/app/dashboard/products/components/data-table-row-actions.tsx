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

import { Trash2 } from 'lucide-react';

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
                <Button variant="ghostedit" className=" text-black flex h-1 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <div className="flex flex-col items-start p-2 gap-2">
                    <AddStock productId={products?.id} stock={products?.stock} />
                    <ReduceStock productId={products?.id} stock={products?.stock} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
