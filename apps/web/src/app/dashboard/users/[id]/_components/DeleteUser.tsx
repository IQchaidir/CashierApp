import { Button } from '@/components/ui/button';
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
import { useToast } from '@/components/ui/use-toast';
import useCashier from '@/hooks/useCashier';
import useDeleteCashier from '@/hooks/useDeleteCashier';

import { Trash2 } from 'lucide-react';

type Props = {
    id: number;
};

export default function DeleteCashier({ id }: Props) {
    const { mutate, isPending } = useDeleteCashier();
    const { refetch } = useCashier();
    const { toast } = useToast();

    const handleDelete = () => {
        mutate(
            { id },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'User deleted successfully !',
                    });
                    refetch();
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'User Failed to delete !',
                        description: res?.response?.data?.message,
                    });
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger className="text-red-500 flex items-center gap-2 pl-2">
                <Trash2 className="w-4 h-4" />
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Cashier</DialogTitle>
                    <DialogDescription>Are you sure delete this cashier?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            disabled={isPending}
                            onClick={() => {
                                handleDelete();
                            }}
                        >
                            Yes !
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
