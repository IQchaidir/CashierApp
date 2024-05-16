'use client';
import NumberPad from '@/app/checkout/_component/NumberPads';
import ListPayment from './_component/ListPayment';
import { useState } from 'react';

const CheckoutPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('CASH');

    const handleChangePayment = (payment: any) => {
        setSelectedPayment(payment);
    };

    return (
        <div className="flex">
            <ListPayment handleChangePayment={handleChangePayment} />
            <NumberPad selectedPayment={selectedPayment} />
        </div>
    );
};

export default CheckoutPage;
