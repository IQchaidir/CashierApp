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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SelectCategory() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selectCategory, setSelectCategory] = useState(searchParams.get('category') || 'All Product');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectCategory && selectCategory !== 'All Product') {
            params.set('category', selectCategory);
            params.delete('page');
        } else {
            params.delete('category');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [selectCategory]);

    const handleCategoryChange = (category: string) => {};

    return (
        <Select value={selectCategory} onValueChange={setSelectCategory}>
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