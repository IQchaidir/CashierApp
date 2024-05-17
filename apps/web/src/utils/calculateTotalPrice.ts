import { CartItem } from '@/types/cart';

export const calculateTotalPrice = (cartItems: CartItem[]): number => {
    return cartItems.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
};
