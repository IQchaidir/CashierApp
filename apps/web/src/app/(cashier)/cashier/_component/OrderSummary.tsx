'use client';
import { useRouter } from 'next/navigation';
import { DialogDeleteProduct } from './DialogDeleteProduct';
import { DialogEditProduct } from './DialogEditQuantityProduct';
import { CartItem } from '@/types/cart';
import useCheckShift from '@/hooks/shift/useCheckShift';
import { toast } from '@/components/ui/use-toast';
import { useCookies } from 'next-client-cookies';
import { useCart } from '@/providers/CartContext';
import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { calculateTotalItems } from '@/utils/calculateTotalItem';
import { formatToRupiah } from '@/utils/formatToRupiah';

const OrderSummary = () => {
    const { cartItems } = useCart();
    const router = useRouter();
    const { mutate } = useCheckShift();
    const cookies = useCookies();
    let session = cookies.get('session');
    let username = null;
    if (session) {
        username = JSON.parse(session).username;
    }
    const totalPrice = calculateTotalPrice(cartItems);
    const totalItem = calculateTotalItems(cartItems);

    const handleCheckout = () => {
        mutate(undefined, {
            onSuccess: () => {
                router.push('/checkout');
            },
            onError: (res: any) => {
                toast({
                    variant: 'destructive',
                    description: res?.response?.data?.message,
                });
            },
        });
    };

    return (
        <div className="flex-col w-1/3 bg-white h-[663px]">
            <div className="w-full h-[600px] overflow-auto">
                <div className="flex bg-gray-700 text-white">
                    <div className="flex-1 py-2 px-4">Item</div>
                    <div className="flex-1 py-2 px-4">Quantity</div>
                    <div className="flex-1 py-2 px-4">Total</div>
                </div>
                {cartItems.length > 0 && (
                    <div>
                        {cartItems.map((cart: CartItem, index: any) => (
                            <div key={index} className="flex">
                                <div className="flex-1  py-2 px-4">{cart.name}</div>
                                <div className="flex-1 py-2 px-4">
                                    {cart.quantity} x {formatToRupiah(cart.price)}
                                </div>
                                <div className="flex-1 flex justify-between  py-2 px-4">
                                    {formatToRupiah(cart.price * cart.quantity)}
                                    <div className="flex gap-1">
                                        <DialogEditProduct cartItem={cart} />
                                        <DialogDeleteProduct cartItem={cart} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="py-2 px-4 mt-5">Jumlah item: {totalItem}</div>
                        <div className="py-2 px-4 bg-gray-200">Dilayani Oleh: {username}</div>
                    </div>
                )}
            </div>
            <button
                className="flex bg-[#04C99E] w-full text-2xl mt-2 px-4 py-2 disabled:bg-gray-500/90  text-white justify-between"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
            >
                <span>{cartItems.length > 0 ? `${formatToRupiah(totalPrice)}` : 'Rp. 0'}</span>
                <span>Bayar</span>
            </button>
        </div>
    );
};

export default OrderSummary;
