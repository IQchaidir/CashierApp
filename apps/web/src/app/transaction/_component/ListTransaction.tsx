'use client';
import { FilterPayment } from '@/components/FilterPayment';
import Pagination from '@/components/Pagination';
import { Banknote, CreditCard, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { format } from 'date-fns';

const ListTransaction = ({
    page,
    search,
    payment,
    handleChange,
    data,
}: {
    page: number;
    search: string;
    payment: string;
    handleChange: any;
    data: any;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
    const [input, setInput] = useState(search);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
        handleChange(index);
    };

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

    return (
        <div className="flex-col  w-3/4 bg-white h-[665px]">
            <div className="flex justify-between bg-blue-400 p-3">
                <div className="flex items-center rounded-sm bg-white">
                    <SearchIcon className="w-6 h-6 p-1" />
                    <input
                        type="search"
                        placeholder="Cari transaksi..."
                        value={input}
                        className="flex-1 px-2 py-1 bg-transparent outline-none"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <FilterPayment />
            </div>
            <div className="flex flex-col mt-5 px-2 bg-white gap-2">
                {data.length > 0 &&
                    data.map((transaction: any) => (
                        <div
                            key={transaction.id}
                            className={`flex justify-between cursor-pointer p-2  border border-white ${
                                transaction.id === activeIndex
                                    ? 'bg-blue-100 '
                                    : 'hover:bg-blue-100 hover:border-blue-500'
                            }`}
                            onClick={() => handleItemClick(transaction.id)}
                        >
                            <div className="flex items-center gap-1">
                                {transaction.method === 'CASH' ? (
                                    <Banknote className="text-blue-500 w-9 h-9" />
                                ) : transaction.method === 'DEBIT' ? (
                                    <CreditCard className="text-blue-500 w-9 h-9" />
                                ) : null}
                                <div className="flex flex-col font-semibold">
                                    <p className="text-xs">{transaction.invoice}</p>
                                    <p className="text-xs">
                                        {transaction.amount} - {transaction.method}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-xs">
                                {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListTransaction;
