import * as React from 'react';
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues();
    const selectedValues = new Set(column?.getFilterValue() as string[]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 py-2 space-y-2" align="start">
                {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                        <div key={option.value} className="text-gray-600 flex items-center gap-2 mx-4">
                            <Checkbox
                                checked={isSelected}
                                id={option.value}
                                onCheckedChange={() => {
                                    if (isSelected) {
                                        selectedValues.delete(option.value);
                                    } else {
                                        selectedValues.add(option.value);
                                    }
                                    const filterValues = Array.from(selectedValues);
                                    column?.setFilterValue(filterValues.length ? filterValues : undefined);
                                }}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                            {facets?.get(option.value) && (
                                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                    {facets.get(option.value)}
                                </span>
                            )}
                        </div>
                    );
                })}
            </PopoverContent>
        </Popover>
    );
}
