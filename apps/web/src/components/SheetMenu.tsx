'use client';
import { Calculator, CalendarClock, LogOut } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ReceiptText } from 'lucide-react';
import Link from 'next/link';
import { useCookies } from 'next-client-cookies';
import { usePathname, useRouter } from 'next/navigation';
import LogoutDialog from './LogoutDialog';
import { Separator } from './ui/separator';
import React from 'react';

export function SheetMenu() {
    const pathname = usePathname();
    const cookies = useCookies();
    const session: any = cookies.get('session');
    let username;
    if (session) {
        username = JSON.parse(session).username;
    }
    const menuItems = [
        { icon: <Calculator />, text: 'Kasir', link: '/cashier' },
        { icon: <ReceiptText />, text: 'Transaksi', link: '/transaction' },
        { icon: <CalendarClock />, text: 'Shift', link: '/shift' },
    ];

    const isActiveLink = (link: string) => {
        return pathname === link;
    };

    return (
        <Sheet key={'left'}>
            <SheetTrigger asChild>
                <Menu className="w-[36px] h-[36px]" />
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side={'left'}
                className=" bg-gray-50 p-2 w-[300px] "
            >
                <SheetHeader className="mt-3 p-2">
                    <SheetTitle className="flex justify-start text-2xl">{username}</SheetTitle>
                </SheetHeader>
                <Separator className="mt-3" />
                <div className="grid mt-3 text-2xl">
                    {menuItems.map((item, index) => (
                        <SheetClose asChild key={index}>
                            <Link href={item.link}>
                                <div className="flex py-2 px-1  rounded-sm justify-start items-center space-x-3 cursor-pointer hover:bg-gray-200">
                                    {React.cloneElement(item.icon, {
                                        className: `w-[36px] h-[36px] ${
                                            isActiveLink(item.link) ? 'text-[#04C99E]' : ''
                                        }`,
                                    })}
                                    <span
                                        className={`font-semibold ${isActiveLink(item.link) ? 'text-[#04C99E]' : ''}`}
                                    >
                                        {item.text}
                                    </span>
                                </div>
                            </Link>
                        </SheetClose>
                    ))}

                    <LogoutDialog />
                </div>
            </SheetContent>
        </Sheet>
    );
}
