import useLatestTransaction from '@/hooks/transaction/useLatestTransaction';
import { useCart } from '@/providers/CartContext';
import { formatNumberDebit } from '@/utils/formatNumberDebit';
import { formatToRupiah } from '@/utils/formatToRupiah';
import { CircleCheckBig, PlusIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TransactionSuccessModal = ({ selectedPayment, inputValue }: { selectedPayment: string; inputValue: string }) => {
    const { clearCart, totalPrice } = useCart();
    const { data } = useLatestTransaction();
    const router = useRouter();

    const handleClose = () => {
        clearCart();
        router.push('/cashier');
    };
    if (!data) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="flex flex-col items-center gap-5">
                <CircleCheckBig className="h-36 w-36 text-green-700" />
                <p className="text-2xl text-white font-semibold mb-4">{data.invoice}</p>
                <div className="w-full flex flex-col items-start gap-4 mb-4">
                    <p className="text-xl text-white font-semibold">
                        Total pembayaran: Rp. {formatToRupiah(totalPrice)}
                    </p>
                    {selectedPayment === 'CASH' ? (
                        <p className="text-xl text-white font-semibold">
                            Total kembalian: Rp. {formatToRupiah(Number(inputValue) - totalPrice)}
                        </p>
                    ) : (
                        <p className="text-xl text-white font-semibold">Nomor Debit: {formatNumberDebit(inputValue)}</p>
                    )}
                </div>
                <button
                    onClick={handleClose}
                    className="flex justify-center items-center gap-1 font-medium bg-green-600 p-3 text-xl text-white rounded-sm w-full"
                >
                    <PlusIcon />
                    Buat transaksi baru
                </button>
                <button className="absolute top-0 right-0 m-4 text-white" onClick={handleClose}>
                    <X />
                </button>
            </div>
        </div>
    );
};

export default TransactionSuccessModal;
