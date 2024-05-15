import { Clock, DollarSign, ReceiptText, User } from 'lucide-react';
import React from 'react';

const DetailTransaction = () => {
    return (
        <div className="flex flex-col w-1/4 bg-gray-200 ">
            <div className="flex flex-col p-4 gap-2">
                <div className="flex gap-1 text-sm">
                    <ReceiptText className="w-5 h-5" /> INV-123123131-01
                </div>
                <div className="flex gap-1 text-sm">
                    <Clock className="w-5 h-5" /> 15 May 2024 16.49
                </div>
                <div className="flex gap-1 text-sm">
                    <User className="w-5 h-5" />
                    Cashier 1
                </div>
                <div className="flex gap-1 text-sm">
                    <DollarSign className="w-5 h-5" />
                    CASH
                </div>
            </div>
            <div className="w-full border overflow-auto text-sm ">
                <div className="flex bg-gray-700 text-white">
                    <div className="flex-1 py-2 px-4">Item</div>
                    <div className="flex-1 py-2 px-4">Quantity</div>
                    <div className="flex-1 py-2 px-4">Total</div>
                </div>
                <div>
                    <div className="flex">
                        <div className="flex-1  py-2 px-4">indomie</div>
                        <div className="flex-1 py-2 px-4">1 x 10.000</div>
                        <div className="flex-1 flex justify-between  py-2 px-4">
                            10.000
                            <div className="flex gap-1"></div>
                        </div>
                    </div>

                    <div className="py-2 px-4 mt-5">Jumlah item: 5</div>
                </div>
                <div className="fixed bottom-0 border-t-2 border-blue-500 w-full text-2xl py-2 font-semibold text-blue-500 pl-36 ">
                    <p>Rp. 10.000</p>
                </div>
            </div>
        </div>
    );
};

export default DetailTransaction;
