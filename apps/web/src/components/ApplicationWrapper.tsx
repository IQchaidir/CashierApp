'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';

export default function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (
        [
            '/dashboard/report',
            '/dashboard/users',
            '/dashboard/products',
            '/dashboard/categories',
            '/dashboard/transactions',
            '/dashboard/shifts',
        ].includes(pathname)
    ) {
        return (
            <div className="min-h-screen w-full bg-white text-black flex">
                <SideNavbar />
                {children}
            </div>
        );
    } else if (['/cashier', '/transaction', '/shift', '/checkout'].includes(pathname)) {
        return (
            <>
                <Navbar />
                <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
            </>
        );
    } else if (pathname === `/login`)
        return <div className="relative min-h-screen w-full bg-gray-100 ">{children}</div>;
    else {
        return null;
    }
}
