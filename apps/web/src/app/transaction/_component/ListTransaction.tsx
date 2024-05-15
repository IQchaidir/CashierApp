'use client';
import { FilterPayment } from '@/components/FilterPayment';
import Pagination from '@/components/Pagination';
import useProduct from '@/hooks/useProduct';
import { Banknote, CreditCard, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const ListTransaction = ({ page, search, payment }: { page: number; search: string; payment: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
    const [input, setInput] = useState(search);
    const { data, isLoading, isError } = useProduct({
        page,
        search,
        payment,
    });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const transactions = [
        { invoice: 'INV-123123132-01', amount: '3.000', paymentMethod: 'CASH', date: '15 May 2024 13:55' },
        { invoice: 'INV-123123132-03', amount: '7.200', paymentMethod: 'DEBIT', date: '17 May 2024 10:10' },
    ];

    const handleItemClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
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
                {transactions.map((transaction, index) => (
                    <div
                        key={index}
                        className={`flex justify-between cursor-pointer p-2  border border-white ${
                            index === activeIndex ? 'bg-blue-100 ' : 'hover:bg-blue-100 hover:border-blue-500'
                        }`}
                        onClick={() => handleItemClick(index)}
                    >
                        <div className="flex items-center gap-1">
                            {transaction.paymentMethod === 'CASH' ? (
                                <Banknote className="text-blue-500 w-16 h-16" />
                            ) : transaction.paymentMethod === 'DEBIT' ? (
                                <CreditCard className="text-blue-500 w-16 h-16" />
                            ) : null}
                            <div className="flex flex-col font-semibold">
                                <p className="text-base">{transaction.invoice}</p>
                                <p className="text-base">
                                    {transaction.amount} - {transaction.paymentMethod}
                                </p>
                            </div>
                        </div>
                        <p className="font-semibold">{transaction.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListTransaction;
