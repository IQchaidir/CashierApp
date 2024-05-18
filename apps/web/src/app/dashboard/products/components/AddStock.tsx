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
import useReduceStock from '@/hooks/useReduceStock';
import useProduct from '@/hooks/useProduct';
import useAddedStock from '@/hooks/useAddedStock';

type Props = {
    productId: string;
    stock: number;
};

export default function AddStock({ productId, stock }: Props) {
    const [qty, setQty] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const { mutate, isPending } = useAddedStock();

    const handleAddStock = () => {
        if (qty === 0) {
            return setOpen(false);
        }
        if (qty < 0) {
            return toast({
                variant: 'destructive',
                title: 'Failed to update stock !',
                description: 'Tidak boleh memasukan angka minus!',
            });
        }
        mutate(
            { productId, quantity: qty },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Stock updated successfully !',
                    });
                    setOpen(false);
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Failed to update stock !',
                        description: res?.response?.data,
                    });
                },
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger>
                <span className="text-green-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Stock
                </span>
            </DialogTrigger>
            <DialogContent className="w-64">
                <DialogHeader>
                    <DialogTitle>Add Stock Product !</DialogTitle>
                    <DialogDescription>Stock now: {stock}</DialogDescription>
                </DialogHeader>
                <div className="grid flex-1 gap-2">
                    <Input type="number" min={1} onChange={(e) => setQty(Number(e.target.value))} />
                </div>

                <DialogFooter>
                    <Button type="submit" disabled={isPending} onClick={handleAddStock}>
                        Confirm !
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
