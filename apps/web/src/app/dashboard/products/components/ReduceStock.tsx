'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

import { Minus, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
    storeId: string;
    productId: string;
    quantity: number;
};

export default function ReduceStock({ storeId, productId, quantity }: Props) {
    const [qty, setQty] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const handleAddStock = () => {
        // mutate(
        //   { storeId, productId, qty },
        //   {
        //     onSuccess: () => {
        //       toast({
        //         variant: 'success',
        //         title: 'Stock updated successfully !',
        //       });
        //       refetch();
        //       setOpen(false);
        //     },
        //     onError: (res: any) => {
        //       toast({
        //         variant: 'destructive',
        //         title: 'Failed to update stock !',
        //         description: res?.response?.data?.message,
        //       });
        //     },
        //   },
        // );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger>
                <span className="text-yellow-700 flex items-center gap-2">
                    <Minus className="w-4 h-4" />
                    Reduce Stock
                </span>
            </DialogTrigger>
            <DialogContent className="w-64">
                <DialogHeader>
                    <DialogTitle>Reduce Stock Product !</DialogTitle>
                    <DialogDescription>Stock now: {quantity}</DialogDescription>
                    {!!qty && <DialogDescription>Stock after: {quantity - qty}</DialogDescription>}
                </DialogHeader>
                <div className="grid flex-1 gap-2">
                    <Input type="number" min={1} onChange={(e) => setQty(Number(e.target.value))} />
                </div>

                <DialogFooter>
                    <Button type="submit" onClick={handleAddStock}>
                        Confirm !
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
