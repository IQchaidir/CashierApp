'use client';
import { Package, UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useProduct from '@/hooks/useProduct';
import { Product } from '@/types/product';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import { FilterCategoryProduct } from '@/components/FilterCategoryProduct';

export default function ProductsDashboard({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        category?: string;
        page?: string;
    };
}) {
    const category = searchParams?.category || '';
    const search = searchParams?.search || '';
    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const { data, refetch } = useProduct({
        page: currentPage,
        category,
        search: input,
    });
    const [products, setProducts] = useState<Product[]>(data);

    const handleSearch = (term: string) => {
        setInput(term);
    };

    useEffect(() => {
        if (data) {
            setProducts(data.products);
            refetch();
        }
    }, [data, input, currentPage, category]);

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-end justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Package />
                            Product List
                        </h2>
                        <p className="text-muted-foreground">list of all product</p>
                        <Link
                            href={`/dashboard/products/create`}
                            className="border bg-blue-500 p-2 cursor-pointer font-medium flex gap-2 items-center rounded-md text-white"
                        >
                            <UserPlus className="w-4 h-4 text-" />
                            Create Product
                        </Link>
                    </div>
                    <div className="flex gap-1">
                        <div className="border rounded-sm border-black">
                            <SearchInput
                                initialSearch={search}
                                onSearchChange={handleSearch}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        <div className="border rounded-sm border-black">
                            <FilterCategoryProduct setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </div>
                {!!products?.length && <DataTable data={products} columns={columns} />}
                <div className="flex justify-end ">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data?.totalPages ?? 1}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}
