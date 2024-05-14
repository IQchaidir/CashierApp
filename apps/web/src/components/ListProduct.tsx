'use client';
import { SearchIcon } from 'lucide-react';
import { SelectCategory } from './SelectCategory';
import CardProduct from './CardProduct';
import Pagination from './Pagination';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import useProduct from '@/hooks/useProduct';

const ListProduct = ({ page, search, category }: { page: number; search: string; category: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
    const [input, setInput] = useState(search);
    const { data, isLoading, isError } = useProduct({
        page,
        search,
        category,
    });

    const handleSearch = (term: string) => {
        updateSearchParams(term);
        setInput(term);
    };

    const updateSearchParams = useDebouncedCallback((term: string) => {
        setInput(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
            params.delete('page');
        } else {
            params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        if (page > 1) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }
        router.replace(`${pathname}?${params.toString()}`);
        setCurrentPage(page);
    };

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category && category !== 'All Product') {
            params.set('category', category);
            params.delete('page');
        } else {
            params.delete('category');
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex-col p-2 w-2/3 bg-blue-400 ">
            <div className="flex justify-between">
                <div className="flex items-center rounded-sm bg-white">
                    <SearchIcon className="w-6 h-6 p-1" />
                    <input
                        type="search"
                        placeholder="Cari produk..."
                        value={input}
                        className="flex-1 px-2 py-1 bg-transparent outline-none"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <SelectCategory onCategoryChange={handleCategoryChange} />
            </div>
            {data && (
                <>
                    <div className="grid grid-cols-7 mt-3">
                        {data.products.map((product: any) => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="fixed bottom-5 flex right-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ListProduct;
