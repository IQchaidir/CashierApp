'use client';
import React, { useState } from 'react';
import ListTransaction from './_component/ListTransaction';
import DetailTransaction from './_component/DetailTransaction';
import useTransaction from '@/hooks/useTransaction';

const TransactionPage = ({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        payment?: string;
        page?: string;
    };
}) => {
    const currentPage = Number(searchParams?.page) || 1;
    const search = searchParams?.search || '';
    const payment = searchParams?.payment || '';
    const { data } = useTransaction();
    const [selectedTransaction, setSelectedTransaction] = useState(1);

    const handleChange = (selectedId: any) => {
        setSelectedTransaction(selectedId);
    };
    let dataTransaction = [];
    let transaction = '';
    if (data) {
        transaction = data.find((transaction: any) => transaction.id === selectedTransaction);
        dataTransaction = data;
    }
    return (
        <div className="flex">
            <ListTransaction
                page={currentPage}
                search={search}
                payment={payment}
                handleChange={handleChange}
                data={dataTransaction}
            />
            <DetailTransaction transaction={transaction} />
        </div>
    );
};

export default TransactionPage;
