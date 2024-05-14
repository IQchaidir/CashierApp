import { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
    name: string;
    price: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    editQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}
