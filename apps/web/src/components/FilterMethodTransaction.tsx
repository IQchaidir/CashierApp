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

    return (
        <Select value={selectPayment} onValueChange={setSelectPayment}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Payment" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All Payment">Semua Transaksi</SelectItem>
                <SelectItem value="CASH">CASH</SelectItem>
                <SelectItem value="DEBIT">DEBIT</SelectItem>
            </SelectContent>
        </Select>
    );
}
