'use client';
import React, { useState } from 'react';
import ListTransaction from './_component/ListTransaction';
import DetailTransaction from './_component/DetailTransaction';

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
    const [selelectedTransaction, setSelectedTransaction] = useState();
    return (
        <div className="flex">
            <ListTransaction page={currentPage} search={search} payment={payment} />
            <DetailTransaction />
        </div>
    );
};

export default TransactionPage;
