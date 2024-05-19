'use client';
import { ScrollText } from 'lucide-react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import CreateCategory from './_components/CreateCategory';
import useGetCategoryAdmin from '@/hooks/category/useGetCategoryAdmin';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';

export default function CategoriesDashboard({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
    };
}) {
    const search = searchParams?.search || '';
    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const { data, refetch } = useGetCategoryAdmin({
        page: currentPage,
        search: input,
    });
    const [category, setCategory] = useState<Category[]>(data);

    const handleSearch = (term: string) => {
        setInput(term);
    };

    useEffect(() => {
        if (data) {
            setCategory(data.category.categories);
            refetch();
        } else return setCategory([]);
    }, [data, input, currentPage]);

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-end justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <ScrollText />
                            Category List
                        </h2>
                        <p className="text-muted-foreground">list of all category</p>
                        <CreateCategory />
                    </div>
                    <div className="border rounded-sm border-black">
                        <SearchInput
                            initialSearch={search}
                            onSearchChange={handleSearch}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
                {!!category && category.length > 0 ? (
                    <DataTable data={category} columns={columns} />
                ) : (
                    <DataTable data={[]} columns={columns} />
                )}
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
