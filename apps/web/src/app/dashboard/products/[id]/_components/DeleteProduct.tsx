'use client';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProduct({ id }: { id: string }) {
    const router = useRouter();

    const handleDeleteProduct = () => {
        // mutate(
        //   { id },
        //   {
        //     onSuccess: () => {
        //       toast({
        //         variant: 'success',
        //         title: 'Product deleted successfully !',
        //       });
        //       router.push('/dashabord/products');
        //     },
        //     onError: (res: any) => {
        //       toast({
        //         variant: 'destructive',
        //         title: 'Failed to delete Product !',
        //         description: res?.response?.data?.message,
        //       });
        //     },
        //   },
        // );
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
                    <DialogDescription>Product cannot deleted, if some store assign this product !</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleDeleteProduct}>Yes !</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
