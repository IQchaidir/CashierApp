'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import { buttonVariants } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { LogOut } from 'lucide-react';
import useLogout from '@/hooks/useLogout';
import { useCart } from '@/providers/CartContext';

export default function LogoutDialog() {
    const router = useRouter();
    const { data } = useLogout();
    const { removeSessionCookie } = useSession();
    const { clearCart } = useCart();
    return (
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: 'link' }), 'w-full mt-4 flex items-center gap-2')}>
                <div className="fixed bottom-10 left-6 text-lg flex py-2 px-1 rounded-sm justify-start items-center space-x-3 cursor-pointer hover:bg-gray-200">
                    <LogOut className="w-[36px] h-[36px]" />
                    <span className="font-semibold text-2xl">Keluar</span>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[300px]">
                {data === 'shift' ? (
                    <DialogHeader>
                        <DialogTitle>Yakin mau keluar?</DialogTitle>
                        <DialogDescription>Pastikan dulu kamu sudah mengakhiri shift</DialogDescription>
                    </DialogHeader>
                ) : (
                    <DialogHeader>
                        <DialogTitle>Logout !</DialogTitle>
                        <DialogDescription>Akan diarahakan ke halaman login</DialogDescription>
                    </DialogHeader>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex justify-end gap-5">
                            {data === 'shift' && (
                                <button
                                    className="border-[#04C99E] border px-2 rounded-sm"
                                    onClick={() => {
                                        router.push('/shift');
                                    }}
                                >
                                    Akhiri shift
                                </button>
                            )}
                            <button
                                className="bg-[#04C99E] text-white w-20 p-1 rounded-sm"
                                onClick={() => {
                                    removeSessionCookie();
                                    clearCart();
                                    router.push('/login');
                                }}
                            >
                                Ya
                            </button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
