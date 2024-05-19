import { Separator } from '@/components/ui/separator';
import { formatToRupiah } from '@/utils/formatToRupiah';
import React from 'react';

const DetailCurrentShift = ({ data }: { data: any }) => {
    let cashDifference;
    let actualCash;
    if (data) {
        actualCash = Number(data.data.initial_cash) + Number(data.data.totalCash);
        cashDifference = data.data.initial_cash + data.data.totalCash;
        if (cashDifference < 0) cashDifference = 0;
    }
    return (
        <div className="w-1/2 p-8 bg-grey-50 h-full ">
            <h2 className="text-3xl font-bold mb-2  text-center text-gray-700">Detail Shift</h2>
            <Separator className="mb-8" />
            <div className="grid grid-cols-2 gap-4 px-16 mb-4 justify-center items-center">
                <div className="col-span-2 flex items-center gap-2">
                    <p className="text-gray-600">Kasir:</p>
                    <p className="text-lg font-semibold text-gray-800">{data.data.user.user_name}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-gray-600">Mulai Shift:</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {new Date(data.data.start_time).toLocaleString()}
                    </p>
                </div>
                <div className="col-span-2">
                    <p className="text-gray-600">Uang Kas di Awal:</p>
                    <p className="text-lg font-semibold text-gray-800">{formatToRupiah(data.data.initial_cash)}</p>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <p className="text-gray-600">Transaksi Cash:</p>
                    <p className="text-lg font-semibold text-gray-800">{formatToRupiah(data.data.totalCash)}</p>
                </div>
                <div className="col-span-2 md:col-span-1 ">
                    <p className="text-gray-600">Transaksi Debit:</p>
                    <p className="text-lg font-semibold text-gray-800">{formatToRupiah(data.data.totalDebit)}</p>
                </div>
                <div className="col-span-2 mb-5">
                    <p className="text-gray-600">Total Transaksi:</p>
                    <p className="text-lg font-semibold text-gray-800">{formatToRupiah(data.data.totalAmount)}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-gray-600">Total Kas Diharapkan:</p>
                    <p className="text-lg font-semibold text-gray-800">{formatToRupiah(Number(actualCash))}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailCurrentShift;
