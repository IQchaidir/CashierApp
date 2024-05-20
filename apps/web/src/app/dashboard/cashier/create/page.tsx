import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import CreateCashier from './_component/CreateCashier';

export default function CreateAdminPage() {
    return (
        <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
            <Link href={'/dashboard/cashier'}>
                <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
            </Link>
            <div className="text-3xl font-extrabold">Create New Cashier</div>
            <CreateCashier />
        </div>
    );
}
