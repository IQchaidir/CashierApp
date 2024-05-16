'use client';
import { Calculator, CalendarClock, LogOut } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ReceiptText } from 'lucide-react';
import Link from 'next/link';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

export function SheetMenu() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    let email;
    if (session) {
        email = JSON.parse(session).email;
    }
    const router = useRouter();
    const menuItems = [
        { icon: <Calculator />, text: 'Aplikasi Kasir', link: '/cashier' },
        { icon: <ReceiptText />, text: 'Transaksi', link: '/transaction' },
        { icon: <CalendarClock />, text: 'Shift', link: '/shift' },
    ];

    const handleLogout = () => {
        cookies.remove('session');
        router.push('/login');
    };

    return (
        <Sheet key={'left'}>
            <SheetTrigger asChild>
                <Menu />
            </SheetTrigger>
            <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side={'left'} className="bg-gray-50 w-[250px]">
                <SheetHeader className="mt-10">
                    <SheetTitle className="flex justify-center text-lg">{email}</SheetTitle>
                </SheetHeader>
                <div className="grid mt-3 py-4 text-lg">
                    {menuItems.map((item, index) => (
                        <SheetClose asChild key={index}>
                            <Link href={item.link}>
                                <div className="flex py-2 px-1 rounded-sm justify-start items-center space-x-3 cursor-pointer hover:bg-gray-200">
                                    {item.icon}
                                    <span className="font-semibold">{item.text}</span>
                                </div>
                            </Link>
                        </SheetClose>
                    ))}
                    <div
                        onClick={handleLogout}
                        className="fixed bottom-10 flex py-2 px-1 rounded-sm justify-start items-center space-x-3 cursor-pointer"
                    >
                        <LogOut />
                        <span className="font-semibold">Keluar</span>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
