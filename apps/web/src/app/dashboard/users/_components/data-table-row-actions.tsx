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
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import DeleteCashier from '../[id]/_components/DeleteUser';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const user: any = row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghostedit" className="flex text-black h-1 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>
                    <Link href={`/dashboard/users/${user.id}`} className="flex items-center gap-2">
                        <SquarePen className="w-4 h-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <div className="flex flex-col items-start p-2 gap-2"></div>
                <DropdownMenuSeparator />
                <DeleteCashier id={user?.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
