'use client';
import React, { useState } from 'react';
import ListTransaction from './_component/ListTransaction';
import DetailTransaction from './_component/DetailTransaction';
import useTransactionShift from '@/hooks/transaction/useTransactionShift';

const TransactionPage = ({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        payment?: string;
        page?: string;
    };
}) => {
    const page = Number(searchParams?.page) || 1;
    const search = searchParams?.search || '';
    const payment = searchParams?.payment || '';
    const { data, isLoading } = useTransactionShift({
        search,
        payment,
        page,
    });
    const [selectedTransaction, setSelectedTransaction] = useState(1);

    const handleChange = (selectedId: any) => {
        setSelectedTransaction(selectedId);
    };
    let totalPages;
    let dataTransaction = [];
    let transaction = '';
    if (data) {
        transaction = data.transaction.find((transaction: any) => transaction.id === selectedTransaction);
        dataTransaction = data.transaction;
        totalPages = data.totalPages;
    }

    return (
        <div className="flex">
            <ListTransaction
                search={search}
                handleChange={handleChange}
                data={dataTransaction}
                totalPages={totalPages}
            />
            <DetailTransaction transaction={transaction} />
        </div>
    );
};

export default TransactionPage;
