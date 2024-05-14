import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/providers/CartContext';
import { CartItem } from '@/types/cart';
import { DialogClose } from '@radix-ui/react-dialog';
import { remove } from 'cypress/types/lodash';
import { Trash2Icon } from 'lucide-react';

export const DialogDeleteProduct = ({ cartItem }: { cartItem: CartItem }) => {
    const { removeProduct } = useCart();

    const handleDelete = () => {
        removeProduct(cartItem.product.id);
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Trash2Icon className="w-5 h-5 text-red-500 z-50" />
            </DialogTrigger>
            <DialogContent className="flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-center">KONFIMASI</DialogTitle>
                    <hr className="bg-black"></hr>
                </DialogHeader>
                <Trash2Icon className=" mx-auto w-8 h-8 text-red-500 mt-10" />
                <p className="text-center text-lg">Anda yakin ingin menghapus data?</p>
                <div className="flex justify-end gap-5 mt-10">
                    <DialogClose asChild>
                        <button className="border-blue-500 border w-20 rounded-sm">Tidak</button>
                    </DialogClose>
                    <DialogClose asChild>
                        <button className="border w-20 rounded-sm bg-blue-500 text-white" onClick={handleDelete}>
                            Ya
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};
