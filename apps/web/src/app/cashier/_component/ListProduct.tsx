'use client';
import CardProduct from './CardProduct';
import Pagination from '../../../components/Pagination';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/SearchInput';
import LoadingComponent from '@/components/LoadingComponent';
import { Product } from '@/types/product';
import useProductCashier from '@/hooks/useProductCashier';
import { FilterCategoryProduct } from '@/components/FilterCategoryProduct';

const ListProduct = ({ page, search, category }: { page: number; search: string; category: string }) => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = searchParams.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const { data, isLoading } = useProductCashier({
        page,
        search,
        category,
    });

    const handleSearch = (term: string) => {
        setInput(term);
    };

    return (
        <div className="w-2/3 bg-gray-100 ">
            <div className="flex justify-between bg-emerald-300 p-2">
                <SearchInput initialSearch={search} onSearchChange={handleSearch} setCurrentPage={setCurrentPage} />
                <FilterCategoryProduct setCurrentPage={setCurrentPage} />
            </div>
            {isLoading && <LoadingComponent />}
            {data && (
                <>
                    <div className="grid grid-cols-7 mt-3 ml-2">
                        {data.products.map((product: Product) => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="fixed bottom-5 flex right-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data.totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ListProduct;
