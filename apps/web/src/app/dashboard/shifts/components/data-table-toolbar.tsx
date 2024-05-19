'use client';
import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { FilterPayment } from '@/components/FilterMethodTransaction';
import { FilterDateOrder } from '@/components/FilterDateTransaction';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search Invoice..."
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            </div>
            <div className="flex gap-2">
                <FilterPayment />
                <FilterDateOrder />
            </div>
        </div>
    );
}
