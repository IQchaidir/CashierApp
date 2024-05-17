'use client';
import { FilterPayment } from '@/components/FilterMethodTransaction';
import Pagination from '@/components/Pagination';
import { Banknote, CreditCard, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { formatToRupiah } from '@/utils/formatToRupiah';
import LoadingComponent from '@/components/LoadingComponent';
import SearchInput from '@/components/SearchInput';

const ListTransaction = ({
    search,
    handleChange,
    data,
    isLoading,
    totalPages,
}: {
    search: string;
    handleChange: any;
    data: any;
    isLoading: boolean;
    totalPages: any;
}) => {
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = searchParams.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
        handleChange(index);
    };

    const handleSearch = (term: string) => {
        setInput(term);
    };

    return (
        <div className="   w-3/4 bg-white h-[665px]">
            <div className="flex justify-between bg-emerald-300 p-3">
                <SearchInput initialSearch={input} onSearchChange={handleSearch} />
                <FilterPayment />
            </div>
            <div className="flex flex-col mt-5 px-2 bg-white gap-2">
                {isLoading && <LoadingComponent />}
                {data.length > 0 &&
                    data.map((transaction: any) => (
                        <div
                            key={transaction.id}
                            className={`relative flex justify-between cursor-pointer p-2  border border-white ${
                                transaction.id === activeIndex
                                    ? 'bg-emerald-100 '
                                    : 'hover:bg-emerald-100 hover:border-[#04C99E]'
                            }`}
                            onClick={() => handleItemClick(transaction.id)}
                        >
                            <div className="flex items-center gap-1">
                                {transaction.method === 'CASH' ? (
                                    <Banknote className="text-[#04C99E] w-9 h-9" />
                                ) : transaction.method === 'DEBIT' ? (
                                    <CreditCard className="text-[#04C99E] w-9 h-9" />
                                ) : null}
                                <div className="flex flex-col font-semibold">
                                    <p className="text-xs">{transaction.invoice}</p>
                                    <p className="text-xs">
                                        {formatToRupiah(transaction.amount)} - {transaction.method}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-xs">
                                {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </p>
                            <div className="fixed bottom-5 flex right-[410px]">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListTransaction;
