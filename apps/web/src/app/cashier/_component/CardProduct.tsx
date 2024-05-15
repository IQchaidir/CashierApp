import Image from 'next/image';
import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/providers/CartContext';

const CardProduct = ({ product }: { product: Product }) => {
    const { addProduct } = useCart();

    const handleAddToCart = () => {
        addProduct(product);
    };
    return (
        <div
            className="bg-white border rounded-lg overflow-hidden shadow-md w-28 p-2 mb-5 cursor-pointer"
            onClick={handleAddToCart}
        >
            <Image width={100} height={100} src={product.image} alt={product.name} />
            <div>
                <p className="text-xs mt-2 mb-2">{product.name}</p>
                <p className="text-xs mt-2 mb-2">Sisa: {product.stock}</p>
                <p className="text-gray-700 font-semibold text-sm text-end">Rp {product.price}</p>
            </div>
        </div>
    );
};

export default CardProduct;
