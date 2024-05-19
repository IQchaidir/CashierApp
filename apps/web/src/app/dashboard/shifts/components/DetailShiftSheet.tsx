'use client';

import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { formatToRupiah } from '@/utils/formatToRupiah';
export function DetailShiftSheet({ shift, start_time }: { shift: any; start_time: string }) {
    let cashDifference;
    if (shift) {
        cashDifference = shift.totalCash - shift.final_cash;
        if (cashDifference < 0) cashDifference = 0;
    }
    return (
        <Sheet key={'right'}>
            <SheetTrigger asChild>
                <div className="cursor-pointer">{start_time}</div>
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side={'right'}
                className=" w-[450px] flex flex-col bg-white"
            >
                {shift && (
                    <div className="max-w-2xl p-8 bg-white h-full ">
                        <h2 className="text-3xl font-bold mb-2  text-center text-gray-700">Detail Shift</h2>
                        <Separator className="mb-8" />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="col-span-2 flex items-center gap-2">
                                <p className="text-gray-500">Kasir:</p>
                                <p className="text-lg font-semibold text-gray-800">{shift.user.user_name}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Mulai Shift:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {new Date(shift.start_time).toLocaleString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Akhiri Shift:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {new Date(shift.end_time).toLocaleString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Uang Kas di Awal:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {formatToRupiah(shift.initial_cash)}
                                </p>
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <p className="text-gray-500">Transaksi Cash:</p>
                                <p className="text-lg font-semibold text-gray-800">{formatToRupiah(shift.totalCash)}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <p className="text-gray-500">Transaksi Debit:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {formatToRupiah(shift.totalDebit)}
                                </p>
                            </div>
                            <div className="col-span-2 mb-5">
                                <p className="text-gray-500">Total Transaksi:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {formatToRupiah(shift.totalAmount)}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Total Kas Diharapkan:</p>
                                <p className="text-lg font-semibold text-gray-800">{formatToRupiah(shift.totalCash)}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Kas Aktual:</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {formatToRupiah(shift.final_cash)}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">Selisih:</p>
                                <p
                                    className={`text-lg font-semibold ${
                                        cashDifference === 0 ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    {formatToRupiah(Number(cashDifference))}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid mt-3 py-4 text-lg"></div>
            </SheetContent>
        </Sheet>
    );
}
