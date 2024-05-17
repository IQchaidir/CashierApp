'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import { Button, buttonVariants } from './ui/button';
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

export default function LogoutDialog() {
    const router = useRouter();
    const { removeSessionCookie } = useSession();

    return (
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: 'link' }), 'w-full mt-4 flex items-center gap-2')}>
                <div className="fixed bottom-10 left-6 text-lg flex py-2 px-1 rounded-sm justify-start items-center space-x-3 cursor-pointer hover:bg-gray-200">
                    <LogOut className="w-[36px] h-[36px]" />
                    <span className="font-semibold text-2xl">Keluar</span>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[300px]">
                <DialogHeader>
                    <DialogTitle>Masih ada shift yang aktif! </DialogTitle>
                    {/* <DialogDescription>Will be redirect to admin login page</DialogDescription> */}
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex gap-2 mt-5">
                            <Button
                                className="bg-blue-500 text-white p-2"
                                onClick={() => {
                                    router.push('/shift');
                                }}
                            >
                                Akhiri Shift
                            </Button>
                            <Button
                                className="bg-blue-500 text-white p-2"
                                onClick={() => {
                                    removeSessionCookie();
                                    router.push('/login');
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
