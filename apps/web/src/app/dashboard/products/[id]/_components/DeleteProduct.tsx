'use client';
import { buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import useDeleteProduct from '@/hooks/product/useDeleteProduct';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProduct({ id }: { id: string }) {
    const router = useRouter();
    const { mutate } = useDeleteProduct();

    const handleDeleteProduct = () => {
        mutate(
            { id },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Product deleted successfully !',
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                    router.push('/dashboard/products');
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Failed to delete Product !',
                        description: res?.response?.data?.message,
                    });
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: 'destructive' }), 'flex items-center gap-2')}>
                <Trash2 className="w-4 h-4" />
                Delete Product
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>Yakin hapus produk ini?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <button className="bg-[#04C99E] rounded-sm px-3 text-white" onClick={handleDeleteProduct}>
                            Yes
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
