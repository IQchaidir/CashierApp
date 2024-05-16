import { Clock, DollarSign, ReceiptText, User } from 'lucide-react';
import { format } from 'date-fns';

const DetailTransaction = ({ transaction }: { transaction: any }) => {
    if (!transaction) {
        return <div className=" flex flex-col w-1/4 bg-gray-200 "></div>;
    }

    const totalQuantity = transaction.Transaction_Product.reduce(
        (total: number, item: any) => total + item.quantity,
        0,
    );

    return (
        <div className=" flex flex-col w-1/4 bg-gray-200 ">
            {transaction && (
                <>
                    <div className="  flex flex-col p-4 gap-2">
                        <div className="flex gap-1 text-sm">
                            <ReceiptText className="w-5 h-5" /> {transaction.invoice}
                        </div>
                        <div className="flex gap-1 text-sm">
                            <Clock className="w-5 h-5" />{' '}
                            {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                        </div>
                        <div className="flex gap-1 text-sm">
                            <User className="w-5 h-5" />
                            {transaction.user.email}
                        </div>
                        <div className="flex gap-1 text-sm">
                            <DollarSign className="w-5 h-5" />
                            {transaction.method}
                        </div>
                    </div>
                    <div className="w-full border overflow-auto text-sm ">
                        <div className="flex bg-gray-700 text-white">
                            <div className="flex-1 py-2 px-4">Item</div>
                            <div className="flex-1 py-2 px-4">Quantity</div>
                            <div className="flex-1 py-2 px-4">Total</div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-3">
                                {transaction.Transaction_Product.map((item: any) => (
                                    <div className="flex">
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
                        <div className="fixed bottom-0 border-t-2 border-blue-500 w-full text-2xl py-2 font-semibold text-blue-500 pl-36 ">
                            <p>Rp. {transaction.amount}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailTransaction;
