'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import useEndShift from '@/hooks/shift/useEndShift';
import { formatToRupiah } from '@/utils/formatToRupiah';
import { Clock } from 'lucide-react';

export const DialogEndShift = ({ id }: { id: number }) => {
    const { mutate, isPending } = useEndShift();
    const [finalCash, setFinalCash] = useState<number | undefined>(undefined);
    const [confirmationMode, setConfirmationMode] = useState(false);

    const handleEnd = () => {
        if (finalCash === undefined || finalCash < 0) {
            toast({
                variant: 'destructive',
                title: 'Total akhir uang kas harus diisi dan tidak boleh minus',
            });
        } else {
            setConfirmationMode(true);
        }
    };

    const handleConfirm = () => {
        mutate(
            { id, final_cash: Number(finalCash) },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Berhasil mengakhiri shift',
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

    const handleCancelConfirm = () => {
        setConfirmationMode(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 1 && value.startsWith('0')) {
            value = value.replace(/^0+/, '');
        }
        setFinalCash(value === '' ? undefined : Number(value));
    };

    const now = new Date();
    const formattedCurrentDate = now.toLocaleString().replace(/:\d{2} /, ' ');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full p-2 text-white rounded-sm bg-[#04C99E]">Akhiri Shift</button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                className="flex flex-col w-96"
            >
                <DialogHeader>
                    <DialogTitle className="flex  items-center  justify-center gap-1 text-xl">
                        <DialogTitle className="flex  items-center  justify-center gap-1 text-xl">
                            {confirmationMode ? '' : <Clock />}
                            {confirmationMode ? 'KONFIRMASI' : 'Akhiri Shift'}
                        </DialogTitle>
                    </DialogTitle>
                    <hr className="bg-black"></hr>
                </DialogHeader>
                <div className="text-xl space-y-5 font-medium">
                    <div className="flex flex-col space-y-2">
                        {confirmationMode ? (
                            <p>Kas Akhir: {formatToRupiah(Number(finalCash))}</p>
                        ) : (
                            <>
                                <label htmlFor="finalCash">Kas Akhir:</label>
                                <input
                                    type="text"
                                    id="finalCash"
                                    value={finalCash !== undefined ? finalCash : ''}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                    placeholder="Masukkan kas akhir"
                                />
                            </>
                        )}
                    </div>
                    <p>Waktu Akhir: {formattedCurrentDate}</p>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    {confirmationMode ? (
                        <>
                            <button className="border-[#04C99E] border w-20 rounded-sm" onClick={handleCancelConfirm}>
                                Tidak
                            </button>
                            <DialogClose asChild>
                                <button
                                    className="border w-20 rounded-sm bg-[#04C99E] text-white"
                                    onClick={handleConfirm}
                                    disabled={isPending}
                                >
                                    Ya
                                </button>
                            </DialogClose>
                        </>
                    ) : (
                        <>
                            <DialogClose asChild>
                                <button
                                    className="border-[#04C99E] border w-20 rounded-sm"
                                    onClick={handleCancelConfirm}
                                >
                                    Tidak
                                </button>
                            </DialogClose>
                            <button
                                className="border w-20 p-1 rounded-sm bg-[#04C99E] text-white"
                                onClick={handleEnd}
                                disabled={isPending}
                            >
                                Lanjutkan
                            </button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
