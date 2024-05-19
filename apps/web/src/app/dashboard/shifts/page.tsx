'use client';
import { Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useTransaction from '@/hooks/useTransaction';
import { Transaction } from '@/types/transaction';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import { FilterDateOrder } from '@/components/FilterDateTransaction';
import useShift from '@/hooks/shift/useShift';
import { Shift } from '@/types/shift';

export default function ShiftDashboard({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
        start_date?: string;
        end_date?: string;
    };
}) {
    const search = searchParams?.search || '';
    const start_date = searchParams?.start_date || '';
    const end_date = searchParams?.end_date || '';
    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setendDate] = useState(end_date);
    const { data, refetch } = useShift({
        page: currentPage,
        search: input,
        start_date: start_date,
        end_date: end_date,
    });
    const [shift, setShift] = useState<Shift[]>();

    const handleSearch = (term: string) => {
        setInput(term);
    };

    const handlefilterDate = (startDate: any, endDate: any) => {
        setStartDate(startDate);
        return setendDate(endDate);
    };

    useEffect(() => {
        if (data) {
            setShift(data.shift);
            refetch();
        } else return setShift([]);
    }, [data, input, currentPage, startDate, endDate]);

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-end justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Users />
                            Shift List
                        </h2>
                        <p className="text-muted-foreground">list of all shift</p>
                        <div className="border rounded-sm border-black">
                            <SearchInput
                                initialSearch={search}
                                onSearchChange={handleSearch}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                    <FilterDateOrder
                        handlefilterDate={handlefilterDate}
                        setCurrentPage={setCurrentPage}
                        start_date={startDate}
                        end_date={endDate}
                    />
                </div>
                {!!shift && shift.length > 0 ? (
                    <DataTable data={shift} columns={columns} />
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
