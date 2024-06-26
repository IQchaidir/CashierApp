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

export function FilterPayment({ setCurrentPage }: { setCurrentPage: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selectPayment, setSelectPayment] = useState(searchParams.get('payment') || 'All Payment');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectPayment && selectPayment !== 'All Payment') {
            params.set('payment', selectPayment);
            params.delete('page');
            setCurrentPage(1);
        } else {
            params.delete('payment');
            setCurrentPage(1);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [selectPayment]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const page = params.get('page');
        if (page && page !== '1') {
            if (selectPayment && selectPayment !== 'All Payment') {
                params.set('payment', selectPayment);
            }
            setCurrentPage(page);
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, []);

    const handleChange = () => {
        setCurrentPage(1);
    };

    return (
        <Select value={selectPayment} onValueChange={setSelectPayment}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Payment" />
            </SelectTrigger>
            <SelectContent onChange={handleChange}>
                <SelectItem value="All Payment">Semua Transaksi</SelectItem>
                <SelectItem value="CASH">CASH</SelectItem>
                <SelectItem value="DEBIT">DEBIT</SelectItem>
            </SelectContent>
        </Select>
    );
}
