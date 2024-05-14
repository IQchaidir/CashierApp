'use client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { DialogDeleteProduct } from './DialogDeleteProduct';
import { DialogEditProduct } from './DialogEditProduct';
import { useCart } from '@/providers/CartContext';
import { CartItem } from '@/types/cart';

const OrderSummary = () => {
    const { cartItems } = useCart();
    const router = useRouter();
    const totalPrice = cartItems.reduce((acc: number, cart: CartItem) => acc + cart.price * cart.quantity, 0);
    const totalItem = cartItems.reduce((acc: number, cart: CartItem) => acc + cart.quantity, 0);

    return (
        <div className="flex-col p-2 w-1/3 bg-white">
            <div className="flex justify-center text-blue-500 font-semibold">Pesanan Baru</div>
            <div className="w-full border h-[575px] overflow-auto">
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
                                    {cart.quantity} x {cart.price}
                                </div>
                                <div className="flex-1 flex justify-between  py-2 px-4">
                                    {cart.price * cart.quantity}
                                    <div className="flex gap-1">
                                        <DialogDeleteProduct cartItem={cart} />
                                        <DialogEditProduct cartItem={cart} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="py-2 px-4 mt-5">Jumlah item: {totalItem}</div>
                <div className="py-2 px-4 bg-gray-100">Dilayani Oleh: Iqbal Chaidir</div>
            </div>
            <Button
                className="flex bg-green-600 w-full text-2xl mt-2 px-4 rounded-sm justify-between"
                onClick={() => router.push('/checkout')}
                disabled={cartItems.length === 0}
            >
                <span>{cartItems.length > 0 ? `Rp. ${totalPrice}` : 'Rp. 0'}</span>
                <span>Bayar</span>
            </Button>
        </div>
    );
};

export default OrderSummary;
