'use client';

import { useState } from 'react';
import { Nav } from './ui/nav';

import {
    ChevronRight,
    LayoutDashboard,
    UsersRound,
    ScrollText,
    NotebookPen,
    Store,
    BarChart3,
    LineChart,
    Tag,
} from 'lucide-react';
import { Button } from './ui/button';
import useSession from '@/hooks/useSession';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';
import LogoutDialog from './LogoutDialog';

type Props = {};
const SideNavbar = (props: Props) => {
    const { session, removeSessionCookie } = useSession();
    const router = useRouter();

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toogleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const links = [
        {
            title: 'Stores',
            href: '/dashboard/stores',
            icon: Store,
            variant: 'ghost',
        },
        {
            title: 'Product Catalog',
            href: '/dashboard/products',
            icon: NotebookPen,
            variant: 'ghost',
        },
        {
            title: 'Categories',
            href: '/dashboard/categories',
            icon: ScrollText,
            variant: 'ghost',
        },
        {
            title: 'Orders',
            href: '/dashboard/orders',
            icon: Tag,
            variant: 'ghost',
        },
        {
            title: 'Stock Report',
            href: '/dashboard/stock-report',
            icon: BarChart3,
            variant: 'ghost',
        },
        {
            title: 'Sales Report',
            href: '/dashboard/sales-report',
            icon: LineChart,
            variant: 'ghost',
        },
    ];

    if (session?.role == 'Super_Admin')
        links.splice(1, 0, {
            title: 'Users',
            href: '/dashboard/users',
            icon: UsersRound,
            variant: 'ghost',
        });

    return (
        <div className="relative min-w-[80px] border-r px-3 pb-10 pt-8">
            <div className="absolute right-[-20px] top-7">
                <Button onClick={toogleSidebar} variant={'secondary'} className="rounded-full p-2">
                    <ChevronRight />
                </Button>
            </div>
            <div className="mb-4 w-full flex items-center justify-center">
                <LayoutDashboard />
            </div>
            {!isCollapsed && (
                <Badge className="flex items-center justify-center w-full my-4">Hello, {session?.user_name}</Badge>
            )}
            <Nav isCollapsed={isCollapsed} links={links} />
            <LogoutDialog />
        </div>
    );
};
export default SideNavbar;
