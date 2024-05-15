'use client';
import Image from 'next/image';
import { DialogStartShift } from './_component/DialogStartShift';
import { ChangeEvent, useEffect, useState } from 'react';
import useCheckShift from '@/hooks/useCheckShift';

const ShiftPage = () => {
    const [initialCash, setInitialCash] = useState<number | null>(null);
    const { mutate } = useCheckShift();
    const [shift, setShift] = useState();

    useEffect(() => {
        mutate(undefined, {
            onSuccess: (data) => {
                setShift(data);
            },
        });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInitialCash(value === '' ? null : Number(value));
    };

    if (shift) {
        return (
            <div className="flex justify-center items-center h-[665px]">
                <div className="flex flex-col items-center">
                    <p>ada Shift Aktif</p>
                    <button className=" bg-green-700 w-full p-2 rounded-sm mt-5 text-xl font-medium text-white">
                        Akhiri Shift
                    </button>
                </div>
            </div>
        );
    } else
        return (
            <div className="flex justify-center pt-24 h-[665px]">
                <div className="flex flex-col items-center">
                    <Image src={'/cashier.png'} alt="cashier" width={200} height={200} />
                    <input
                        type="number"
                        value={initialCash === null ? '' : initialCash}
                        className="w-full border-b-2 border-black focus:border-indigo-500 focus:outline-none py-2 px-4 bg-transparent"
                        placeholder="Kas Awal di Laci"
                        onChange={handleChange}
                    />
                    <DialogStartShift initial_cash={initialCash ?? 0} />
                </div>
            </div>
        );
};

export default ShiftPage;
