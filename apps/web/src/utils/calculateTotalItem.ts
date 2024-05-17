import { CartItem } from '@/types/cart';

export const calculateTotalItems = (cartItems: CartItem[]): number => {
    return cartItems.reduce((acc, cart) => acc + cart.quantity, 0);
};
