import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import DeleteProduct from './_components/DeleteProduct';
import EditProduct from './_components/EditProduct';

export default function AdminProductDetails({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
            <Link href={'/dashboard/products'}>
                <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
            </Link>
            <div className="flex justify-between">
                <div className="text-3xl font-extrabold">
                    Update Product <span className="opacity-50 text-base font-medium">(Product id: {id})</span>
                </div>
                <DeleteProduct id={id} />
            </div>
            <EditProduct id={id} />
        </div>
    );
}
