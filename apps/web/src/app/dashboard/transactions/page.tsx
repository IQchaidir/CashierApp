'use client';
import { Tag } from 'lucide-react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useTransaction from '@/hooks/transaction/useTransaction';
import { Transaction } from '@/types/transaction';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import { FilterDateTransaction } from '@/components/FilterDateTransaction';
import { FilterPayment } from '@/components/FilterMethodTransaction';

export default function TransactionDashboard({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
        start_date?: string;
        end_date?: string;
        payment?: string;
    };
}) {
    const search = searchParams?.search || '';
    const payment = searchParams?.payment || '';
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

    const { data, refetch } = useTransaction({
        page: currentPage,
        search: input,
        start_date: start_date,
        end_date: end_date,
        payment,
    });
    const [transaction, setTransaction] = useState<Transaction[]>();

    const handleSearch = (term: string) => {
        setInput(term);
    };

    useEffect(() => {
        if (data) {
            setTransaction(data.transaction);
            refetch();
        } else return setTransaction([]);
    }, [data, input, currentPage, startDate, endDate, payment]);

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-end justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Tag />
                            Transaction List
                        </h2>
                        <p className="text-muted-foreground">list of all transaction</p>
                        <div className="border rounded-sm border-black">
                            <SearchInput
                                initialSearch={search}
                                onSearchChange={handleSearch}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <FilterPayment setCurrentPage={setCurrentPage} />
                        <FilterDateTransaction
                            setCurrentPage={setCurrentPage}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                </div>
                {!!transaction && transaction.length > 0 ? (
                    <DataTable data={transaction} columns={columns} />
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
