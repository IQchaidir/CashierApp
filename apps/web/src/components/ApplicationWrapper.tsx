'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    if (pathname.includes(`/dashboard`))
        return (
            <div className="min-h-screen w-full bg-white text-black flex">
                {/* <SideNavbar /> */}
                {children}
            </div>
        );
    else if (pathname.includes(`/login`))
        return <div className="relative min-h-screen w-full bg-gray-100 ">{children}</div>;
    else if (pathname.includes(`/cashier`))
        return (
            <>
                <Navbar />
                <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
            </>
        );
    else if (pathname.includes(`/transaction`))
        return (
            <>
                <Navbar />
                <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
            </>
        );
    else if (pathname.includes(`/shift`))
        return (
            <>
                <Navbar />
                <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
            </>
        );
    else if (pathname.includes(`/checkout`))
        return (
            <>
                <Navbar />
                <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
            </>
        );
    return <>{children}</>;
}
