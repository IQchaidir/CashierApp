'use client';

import ListPayment from './_component/ListPayment';
import { useEffect, useState } from 'react';
import useCheckShift from '@/hooks/shift/useCheckShift';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import LoadingComponent from '@/components/LoadingComponent';
import NumberPad from './_component/NumberPads';

const CheckoutPage = () => {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState('CASH');
    const { mutate, isError, isPending } = useCheckShift();

    const handleChangePayment = (payment: any) => {
        setSelectedPayment(payment);
    };

    useEffect(() => {
        mutate(undefined, {
            onError: (res: any) => {
                toast({
                    variant: 'destructive',
                    description: res?.response?.data?.message,
                });
                router.push('/cashier');
            },
        });
    }, []);

    if (isPending) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex">
            <ListPayment handleChangePayment={handleChangePayment} />
            <NumberPad selectedPayment={selectedPayment} />
        </div>
    );
};

export default CheckoutPage;
