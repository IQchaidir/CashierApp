'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/auth/useSession';
import { LogOut } from 'lucide-react';
import { useCart } from '@/providers/CartContext';
import { buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function LogoutDialogAdmin({ isCollapsed }: { isCollapsed: any }) {
    const router = useRouter();
    const { removeSessionCookie } = useSession();
    const { clearCart } = useCart();
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    buttonVariants({ variant: 'ghostedit' }),
                    ' mt-4 flex rounded-sm',
                    isCollapsed
                        ? 'text-sm font-medium justify-center items-center'
                        : 'text-lg font-semibold text-white w-full justify-start hover:bg-muted hover:text-black',
                )}
            >
                <div
                    className={cn(
                        'flex rounded-sm justify-start items-center  cursor-pointer',
                        isCollapsed ? 'hover:' : 'space-x-7 ',
                    )}
                >
                    <LogOut className={isCollapsed ? 'text-black rounded-sm bg-white p-1  w-8 h-8 ' : 'ml-4 w-6 h-6'} />
                    <span className={isCollapsed ? '' : 'font-semibold text-xl'}>{isCollapsed ? '' : 'Keluar'}</span>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[300px]">
                <DialogHeader>
                    <DialogTitle>Logout !</DialogTitle>
                    <DialogDescription>Will redirect to login page</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex justify-end gap-5">
                            <button
                                className="bg-[#04C99E] text-white w-20 p-1 rounded-sm"
                                onClick={() => {
                                    removeSessionCookie();
                                    clearCart();
                                    router.push('/login/admin');
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
