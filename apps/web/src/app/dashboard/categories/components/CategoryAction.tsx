'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useSession from '@/hooks/useSession';
import { MoreHorizontal } from 'lucide-react';
import DeleteCategory from './DeleteCategory';
import { Button } from '@/components/ui/button';
import EditCategory from './EditCategory';

type Props = {
    name: string;
    id: Number;
};

export default function CategoryAction({ id, name }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 p-0 text-black">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col items-start p-2 gap-2">
                    <EditCategory id={String(id)} name={name} />
                    <DeleteCategory id={String(id)} name={name} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
