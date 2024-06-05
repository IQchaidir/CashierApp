'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useCategory from '@/hooks/category/useGetCategory';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FilterCategoryProduct({ setCurrentPage }: { setCurrentPage: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { data, isLoading } = useCategory();
    const [selectCategory, setSelectCategory] = useState(searchParams.get('category') || 'All Product');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectCategory && selectCategory !== 'All Product') {
            params.set('category', selectCategory);
            params.delete('page');
            setCurrentPage(1);
        } else {
            params.delete('category');
            setCurrentPage(1);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [selectCategory]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const page = params.get('page');
        if (page && page !== '1') {
            if (selectCategory && selectCategory !== 'All Product') {
                params.set('category', selectCategory);
            }
            setCurrentPage(page);
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectCategory(category);
        setCurrentPage(1);
    };

    return (
        <Select value={selectCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
                {isLoading ? (
                    <SelectValue placeholder="Fetching Categories" />
                ) : (
                    <SelectValue placeholder="Choose a Category" />
                )}
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All Product">All Product</SelectItem>
                {data?.category.categories.map((category: { id: number; name: string }) => (
                    <SelectItem key={category.id} value={category.name}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
