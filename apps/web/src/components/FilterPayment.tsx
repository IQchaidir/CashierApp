'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FilterPayment() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selectPayment, setSelectPayment] = useState(searchParams.get('payment') || 'All Payment');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectPayment && selectPayment !== 'All Payment') {
            params.set('payment', selectPayment);
            params.delete('page');
        } else {
            params.delete('payment');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [selectPayment]);

    const handlePaymentChange = (payment: string) => {};

    return (
        <Select value={selectPayment} onValueChange={setSelectPayment}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Payment" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>payment</SelectLabel>
                    <SelectItem value="All Payment">All Payment</SelectItem>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
