import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import EditCashier from './_components/EditCashier';

export default function AdminEditUser({ params: { id } }: { params: { id: number } }) {
    return (
        <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
            <Link href={'/dashboard/cashier'}>
                <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
            </Link>
            <div className="flex justify-between">
                <div className="text-3xl font-extrabold">
                    Update Cashier <span className="opacity-50 text-base font-medium"></span>
                </div>
            </div>
            <EditCashier id={id} />
        </div>
    );
}
