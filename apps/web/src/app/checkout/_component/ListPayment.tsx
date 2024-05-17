'use client';
import { useState } from 'react';
import { Banknote, CreditCard } from 'lucide-react';

const ListPayment = ({ handleChangePayment }: { handleChangePayment: (payment: any) => void }) => {
    const [selectedPayment, setSelectedPayment] = useState('CASH');

    return (
        <div className="flex  flex-col w-1/3 bg-white border-r-2 border-t-2 h-[664px]">
            <div className="flex w-full h-16 justify-center bg-[#04C99E] items-center px-2 mb-2">
                <p className="text-white text-xl font-medium">Pilih Pembayaran</p>
            </div>
            <div className="flex flex-col px-2 items-center gap-2 font-semibold text-white">
                <button
                    className={`flex gap-4 items-center w-full rounded-md text-3xl px-4 hover:bg-emerald-800 ${
                        selectedPayment === 'CASH' ? 'bg-emerald-800' : 'bg-[#04C99E] '
                    }`}
                    onClick={() => {
                        handleChangePayment('CASH');
                        setSelectedPayment('CASH');
                    }}
                >
                    <Banknote className="w-16 h-16" />
                    <p>Cash</p>
                </button>
                <button
                    className={`flex gap-4 items-center w-full rounded-md text-3xl px-4 hover:bg-emerald-800 ${
                        selectedPayment === 'DEBIT' ? 'bg-emerald-800' : 'bg-[#04C99E] '
                    }`}
                    onClick={() => {
                        handleChangePayment('DEBIT');
                        setSelectedPayment('DEBIT');
                    }}
                >
                    <CreditCard className="w-16 h-16" />
                    <p>Debit</p>
                </button>
            </div>
        </div>
    );
};

export default ListPayment;
