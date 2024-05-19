'use client';
import { UserPlus, Users } from 'lucide-react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import Link from 'next/link';
import useCashier from '@/hooks/useCashier';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';

export default function UserDashboard({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
    };
}) {
    const search = searchParams?.search || '';
    const params = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    const [input, setInput] = useState(search);
    const { data, refetch } = useCashier({
        page: currentPage,
        search: input,
    });
    const [users, setUsers] = useState<User[]>(data);

    const handleSearch = (term: string) => {
        setInput(term);
    };

    useEffect(() => {
        if (data) {
            setUsers(data.getCashier);
            refetch();
        } else setUsers([]);
    }, [data, input, currentPage]);

    return (
        <>
            <div className="hidden relative w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
                <div className="flex items-end justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Users />
                            Cashier List
                        </h2>
                        <p className="text-muted-foreground">list of all cashier</p>
                        <Link
                            href={`/dashboard/users/create`}
                            className="border  bg-[#04C99E] p-2 cursor-pointer font-medium flex gap-2 items-center rounded-md text-white"
                        >
                            <UserPlus className="w-4 h-4 text-" />
                            Create Cashier
                        </Link>
                    </div>
                    <div className="border rounded-sm border-black">
                        <SearchInput
                            initialSearch={search}
                            onSearchChange={handleSearch}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>

                {!!users && users.length > 0 ? (
                    <DataTable data={users} columns={columns} />
                ) : (
                    <DataTable data={[]} columns={columns} />
                )}
                <div className="flex justify-end ">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data?.totalPages ?? 1}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}
