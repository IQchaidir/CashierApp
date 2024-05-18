'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartContextType, CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { useCookies } from 'next-client-cookies';
import { toast } from '@/components/ui/use-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const cookies = useCookies();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = cookies.get('cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            cookies.set('cart', JSON.stringify(cartItems), { expires: 0.02083 });
            const total = cartItems.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
            setTotalPrice(total);
        }
    }, [cartItems, isMounted]);

    const addProduct = (product: Product) => {
        const existingItem = cartItems.find((item) => item.product.id === product.id);

        if (existingItem && existingItem.quantity === existingItem.product.stock) {
            toast({
                variant: 'destructive',
                title: 'Stock Terbatas!',
            });
        } else {
            const updatedCartItems = existingItem
                ? cartItems.map((item) =>
                      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                  )
                : [...cartItems, { product, quantity: 1, name: product.name, price: product.price }];

            setCartItems(updatedCartItems);
        }
    };

    const removeProduct = (productId: number) => {
        setCartItems(cartItems.filter((item) => item.product.id !== productId));
    };

    const editQuantity = (productId: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue: CartContextType = {
        cartItems,
        totalPrice,
        addProduct,
        removeProduct,
        clearCart,
        editQuantity,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
