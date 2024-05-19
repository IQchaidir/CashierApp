'use client';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Clock, DollarSign, ReceiptText, User } from 'lucide-react';

export function DetailTransactionSheet({ transaction, invoice }: { transaction: any; invoice: string }) {
    let totalQuantity;
    if (transaction) {
        totalQuantity = transaction.Transaction_Product.reduce((total: number, item: any) => total + item.quantity, 0);
    }
    return (
        <Sheet key={'right'}>
            <SheetTrigger asChild>
                <div className="cursor-pointer">{invoice}</div>
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side={'right'}
                className=" w-[450px] flex flex-col bg-white"
            >
                {transaction && (
                    <>
                        <div className="flex flex-col p-4 gap-2">
                            <div className="text-5xl text-center mt-4 mb-8 font-medium">Rp. {transaction.amount}</div>
                            <div className="flex gap-1 text-sm">
                                <ReceiptText className="w-5 h-5" /> {transaction.invoice}
                            </div>
                            <div className="flex gap-1 text-sm">
                                <Clock className="w-5 h-5" />{' '}
                                {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </div>
                            <div className="flex gap-1 text-sm">
                                <User className="w-5 h-5" />
                                {transaction.user.user_name}
                            </div>
                            <div className="flex gap-1 text-sm">
                                <DollarSign className="w-5 h-5" />
                                {transaction.method}
                            </div>
                        </div>
                        <div className="w-full overflow-auto text-sm ">
                            <div className="flex bg-gray-700 text-white">
                                <div className="flex-1 py-2 px-4">Item</div>
                                <div className="flex-1 py-2 px-4">Quantity</div>
                                <div className="flex-1 py-2 px-4">Total</div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3">
                                    {transaction.Transaction_Product.map((item: any) => (
                                        <div key={item.id} className="flex">
                                            <div className="flex-1  py-2 px-4">{item.product.name}</div>
                                            <div className="flex-1 py-2 px-4">
                                                {item.quantity} x {item.price}
                                            </div>
                                            <div className="flex-1 flex justify-between  py-2 px-4">
                                                {item.quantity * item.price}
                                                <div className="flex gap-1"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-2 px-4 mt-5">Jumlah item: {totalQuantity}</div>
                            </div>
                        </div>
                    </>
                )}
                <div className="grid mt-3 py-4 text-lg"></div>
            </SheetContent>
        </Sheet>
    );
}
