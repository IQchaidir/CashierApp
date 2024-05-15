import { useCart } from '@/providers/CartContext';
import { Banknote, CreditCard, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TransactionSuccessModal from './TransactionSuccessModal';
import { toast } from '@/components/ui/use-toast';

const NumberPad = ({ selectedPayment }: { selectedPayment: string }) => {
    const [inputValue, setInputValue] = useState('');
    const [showTransactionSuccess, setShowTransactionSuccess] = useState(false);
    const { totalPrice } = useCart();
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

    const handleEnter = () => {
        if (Number(inputValue) < totalPrice) {
            toast({
                variant: 'destructive',
                title: 'Pembayaran tidak boleh kurang dari total belanja!',
            });
        } else {
            setShowTransactionSuccess(true);
        }
    };

    return (
        <div className="flex flex-col  items-center w-2/3">
            <div className="flex w-full justify-between bg-blue-400 items-center px-2">
                <div className="flex items-center">
                    {selectedPayment === 'cash' ? (
                        <>
                            <Banknote className="w-16 h-16 text-white" />
                            <div className="flex flex-col text-white font-medium text-base">
                                <p>Cash</p>
                                <p>Total: Rp {totalPrice}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-16 h-16 text-white" />
                            <div className="flex flex-col text-white font-medium text-base">
                                <p>Total: Rp {totalPrice}</p>
                                <p>Masukan nomor debit</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-3 items-center text-white">
                    {selectedPayment === 'cash' && (
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
                <div className="grid grid-cols-3 gap-2 w-full px-1">
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
                    <button className="bg-green-600 p-4 rounded text-4xl col-span-3 text-white" onClick={handleEnter}>
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
