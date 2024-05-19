import { useCart } from '@/providers/CartContext';
import { Banknote, CreditCard, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TransactionSuccessModal from './TransactionSuccessModal';
import { toast } from '@/components/ui/use-toast';
import { formatToRupiah } from '@/utils/formatToRupiah';
import { validateDebit } from '@/lib/validation';
import useCreateTransaction from '@/hooks/transaction/useCreateTransaction';

const NumberPad = ({ selectedPayment }: { selectedPayment: string }) => {
    const [inputValue, setInputValue] = useState('');
    const [showTransactionSuccess, setShowTransactionSuccess] = useState(false);
    const { cartItems, totalPrice } = useCart();
    const { mutate } = useCreateTransaction();
    const router = useRouter();

    const handleNumberClick = (number: any) => {
        let newValue = inputValue + number.toString();
        newValue = newValue.replace(/^0+/, '');
        setInputValue(newValue);
    };

    const handleInputChange = (e: any) => {
        let value = e.target.value;
        value = value.replace(/^0+/, '');
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleClear = () => {
        setInputValue('');
    };

    const handleEnter = async () => {
        try {
            if (Number(inputValue) < totalPrice && selectedPayment === 'CASH') {
                toast({
                    variant: 'destructive',
                    title: 'Pembayaran tidak boleh kurang dari total belanja!',
                });
            } else {
                let cardNumber = '';

                if (selectedPayment === 'DEBIT') {
                    await validateDebit.validate({ cardNumber: inputValue });
                    cardNumber = inputValue;
                }

                const products = cartItems.map((product) => ({
                    productId: product.product.id,
                    quantity: product.quantity,
                }));
                mutate(
                    { method: selectedPayment, cardNumber, products },
                    {
                        onSuccess: () => {
                            toast({
                                variant: 'success',
                                title: 'transaksi berhasil diproses!',
                            });
                            setShowTransactionSuccess(true);
                        },
                        onError: (res: any) => {
                            toast({
                                variant: 'destructive',
                                title: 'gagal memproses transaksi!',
                                description: res?.response?.data,
                            });
                        },
                    },
                );
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: error.message,
            });
        }
    };

    return (
        <div className="flex flex-col  items-center w-2/3">
            <div className="flex w-full justify-between bg-[#04C99E] border-t-2  items-center px-2">
                <div className="flex items-center">
                    {selectedPayment === 'CASH' ? (
                        <>
                            <Banknote className="w-16 h-16 text-white" />
                            <div className="flex flex-col text-white font-medium text-base">
                                <p>Cash</p>
                                <p>Total: {formatToRupiah(totalPrice)}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-16 h-16 text-white" />
                            <div className="flex flex-col text-white font-medium text-base">
                                <p>Total: {formatToRupiah(totalPrice)}</p>
                                <p>Masukan nomor debit</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-3 items-center text-white">
                    {selectedPayment === 'CASH' && (
                        <>
                            <button
                                onClick={() => setInputValue('5000')}
                                className="border-2 font-medium rounded-sm border-white p-2"
                            >
                                5.000
                            </button>
                            <button
                                onClick={() => setInputValue('10000')}
                                className="border-2 font-medium rounded-sm border-white p-2"
                            >
                                10.000
                            </button>
                            <button
                                onClick={() => setInputValue('20000')}
                                className="border-2 font-medium rounded-sm border-white p-2"
                            >
                                20.000
                            </button>
                            <button
                                onClick={() => setInputValue('50000')}
                                className="border-2 font-medium rounded-sm border-white p-2"
                            >
                                50.000
                            </button>
                            <button
                                onClick={() => setInputValue('100000')}
                                className="border-2 font-medium rounded-sm border-white p-2"
                            >
                                100.000
                            </button>
                        </>
                    )}
                    <button onClick={() => router.push('/cashier')} className="text-white">
                        <X />
                    </button>
                </div>
            </div>
            <div className="flex bg-white flex-col w-full  ">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full border-b-2  focus:border-indigo-500 focus:outline-none py-2 px-4 mb-4 bg-transparent text-end text-5xl"
                />
                <div className="grid grid-cols-3 gap-2 w-full ">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '00'].map((number: any) => (
                        <button
                            key={number}
                            className=" p-4 rounded text-4xl mb-6"
                            onClick={() => handleNumberClick(number)}
                        >
                            {number === '00' ? '00' : number}
                        </button>
                    ))}
                    <button className=" p-4 rounded text-4xl mb-10" onClick={handleClear}>
                        C
                    </button>
                    <button className="bg-[#04C99E] p-4  text-4xl col-span-3 text-white" onClick={handleEnter}>
                        Bayar
                    </button>
                </div>
            </div>
            {showTransactionSuccess && (
                <TransactionSuccessModal inputValue={inputValue} selectedPayment={selectedPayment} />
            )}
        </div>
    );
};

export default NumberPad;
