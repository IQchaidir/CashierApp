'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SelectCategory({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
    const searchParams = useSearchParams();
    const [category, setCategory] = useState(searchParams.get('category') || 'All Product');
    useEffect(() => {
        onCategoryChange(category);
    }, [category]);
    return (
        <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Product" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="All Product">All Product</SelectItem>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
