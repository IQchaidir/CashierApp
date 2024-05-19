// import EditUser from '@/components/dashboard/EditUser';
import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';

export default function AdminEditUser({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="container mx-auto max-w-5xl py-10 space-y-4">
            <Link href={'/dashboard/users'}>
                <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
            </Link>
            <div className="flex justify-between">
                <div className="text-3xl font-extrabold">
                    Update Users <span className="opacity-50 text-base font-medium"></span>
                </div>
            </div>
            {/* <EditUser id={id} /> */}
        </div>
    );
}
