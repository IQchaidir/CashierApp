'use client';
import { Package, UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';

export default function ProductsDashboard() {
    const products = [
        {
            no: 1,
            id: 'P001',
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 10.99,
            weight: 0.5,
            stock: 100,
            category: 'Category A',
            updatedAt: new Date('2024-05-15'),
            createdAt: new Date('2024-05-01'),
        },
        {
            no: 2,
            id: 'P002',
            name: 'Product 2',
            description: 'Description for Product 2',
            price: 15.49,
            weight: 0.75,
            stock: 50,
            category: 'Category B',
            updatedAt: new Date('2024-05-14'),
            createdAt: new Date('2024-04-20'),
        },
        {
            no: 3,
            id: 'P003',
            name: 'Product 3',
            description: 'Description for Product 3',
            price: 25.99,
            weight: 1.2,
            stock: 200,
            category: 'Category A',
            updatedAt: new Date('2024-05-13'),
            createdAt: new Date('2024-05-02'),
        },
    ];

    return (
        <>
            <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Package />
                            Product List
                        </h2>
                        <p className="text-muted-foreground">list of all product</p>
                        <Link
                            href={`/dashboard/products/create`}
                            className="border bg-blue-500 p-2 cursor-pointer font-medium flex gap-2 items-center rounded-md text-white"
                        >
                            <UserPlus className="w-4 h-4 text-" />
                            Create Product
                        </Link>
                    </div>
                </div>
                {!!products?.length && <DataTable data={products} columns={columns} />}
            </div>
        </>
    );
}
