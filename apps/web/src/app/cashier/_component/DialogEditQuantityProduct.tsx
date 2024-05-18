import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/providers/CartContext';
import { CartItem } from '@/types/cart';
import { DialogClose } from '@radix-ui/react-dialog';
import { Edit, MinusSquare, PlusSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DialogEditProduct = ({ cartItem }: { cartItem: CartItem }) => {
    const { editQuantity } = useCart();
    const [quantity, setQuantity] = useState(cartItem.quantity);

    useEffect(() => {
        setQuantity(cartItem.quantity);
    }, [cartItem.quantity]);

    const handleIncrement = () => {
        if (quantity < cartItem.product.stock) {
            setQuantity(quantity + 1);
        } else {
            toast({
                variant: 'destructive',
                title: `Stok terbatas: hanya tersisa ${cartItem.product.stock}`,
            });
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleUpdateQuantity = () => {
        editQuantity(cartItem.product.id, quantity);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Edit className="text-[#04C99E]" />
            </DialogTrigger>
            <DialogContent
                className="flex flex-col"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-center mb-5">QUANTITY</DialogTitle>
                    <hr className="bg-black"></hr>
                </DialogHeader>
                <div className="flex justify-between">
                    <p>{cartItem.product.name}</p>
                    <p>Rp. {cartItem.product.price}</p>
                </div>
                <div className="flex gap-10 justify-center items-center text-4xl  mt-5">
                    <MinusSquare className="w-[36px] h-[36px]" onClick={handleDecrement} />
                    {quantity}
                    <PlusSquare className="w-[36px] h-[36px]" onClick={handleIncrement} />
                </div>
                <DialogClose asChild>
                    <div className="flex justify-end gap-5 mt-10">
                        <button
                            className="border-[#04C99E] border w-20 rounded-sm"
                            onClick={() => setQuantity(cartItem.quantity)}
                        >
                            Tidak
                        </button>
                        <button className="bg-[#04C99E] text-white w-20 rounded-sm" onClick={handleUpdateQuantity}>
                            Ya
                        </button>
                    </div>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
