'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import useCreateShift from '@/hooks/useCreateShit';
import { Check, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const DialogStartShift = ({ initial_cash }: { initial_cash: number }) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateShift();
    const handleStart = () => {
        mutate(
            { initial_cash },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Success create shift!',
                    });
                    window.location.reload();
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: res?.response?.data,
                    });
                },
            },
        );
    };

    const now = new Date();
    const formattedDate = now.toLocaleString();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex justify-center gap-2 bg-green-700 w-full py-2 rounded-sm mt-5 text-xl font-medium text-white">
                    <Check />
                    Mulai Shift
                </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col w-96">
                <DialogHeader>
                    <DialogTitle className="flex  items-center  justify-center gap-1 text-xl">
                        <Clock /> Mulai Shift
                    </DialogTitle>
                    <hr className="bg-black"></hr>
                </DialogHeader>
                <div className="text-xl space-y-5 font-medium">
                    <p>Kas Awal: Rp {Number(initial_cash)}</p>
                    <p>Mulai: {formattedDate}</p>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    <DialogClose asChild>
                        <button className="border-blue-500 border w-20 rounded-sm">Tidak</button>
                    </DialogClose>
                    <DialogClose asChild>
                        <button
                            className="border w-20 rounded-sm bg-blue-500 text-white"
                            onClick={handleStart}
                            disabled={isPending}
                        >
                            Ya
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};
