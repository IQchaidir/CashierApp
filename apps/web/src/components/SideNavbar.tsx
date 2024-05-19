'use client';
import { useState } from 'react';
import { Nav } from './ui/nav';
import { UsersRound, ScrollText, Tag, Menu, LayoutDashboardIcon, Package, CalendarClock } from 'lucide-react';
import { Badge } from './ui/badge';
import LogoutDialogAdmin from '@/app/dashboard/_components/LogoutDialogAdmin';
import Image from 'next/image';

type Props = {};
const SideNavbar = (props: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toogleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const links = [
        {
            title: 'Dashboard',
            href: '/dashboard/reports',
            icon: LayoutDashboardIcon,
            variant: 'ghost',
        },
        {
            title: 'Users',
            href: '/dashboard/users',
            icon: UsersRound,
            variant: 'ghost',
        },
        {
            title: 'Product',
            href: '/dashboard/products',
            icon: Package,
            variant: 'ghost',
        },
        {
            title: 'Categories',
            href: '/dashboard/categories',
            icon: ScrollText,
            variant: 'ghost',
        },
        {
            title: 'Transaction',
            href: '/dashboard/transactions',
            icon: Tag,
            variant: 'ghost',
        },
        {
            title: 'Shifts',
            href: '/dashboard/shifts',
            icon: CalendarClock,
            variant: 'ghost',
        },
    ];

    return (
        <div className="relative min-w-[80px] border-r px-3 pb-10 pt-8 bg-[#04C99E] shadow-md">
            <div className={`mb-4 w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <Image
                    src="/textwhite.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className={` ${isCollapsed ? 'hidden' : ''}`}
                />
                <button onClick={toogleSidebar}>
                    <Menu className="w-10 h-10 text-white" />
                </button>
            </div>
            {!isCollapsed && (
                <Badge className="flex bg-white text-black items-center justify-center w-full p-2 mb-4">ADMIN</Badge>
            )}
            <Nav isCollapsed={isCollapsed} links={links} />
            <LogoutDialogAdmin isCollapsed={isCollapsed} />
        </div>
    );
};
export default SideNavbar;
