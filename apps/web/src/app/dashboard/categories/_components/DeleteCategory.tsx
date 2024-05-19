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
import { toast } from '@/components/ui/use-toast';
import useDeleteCategory from '@/hooks/category/useDeleteCategory';
import { Trash2 } from 'lucide-react';

type Props = {
    id: string;
    name: string;
};

export default function DeleteCategory({ id, name }: Props) {
    const { mutate } = useDeleteCategory();
    const handleDelete = () => {
        mutate(
            { id },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Category deleted !',
                    });
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Category Failed to delete !',
                        description: res?.response?.data,
                    });
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger className="text-red-500 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>Category cannot deleted, if some product have this category !</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <button
                            className="bg-[#04C99E] p-1 rounded-sm text-white"
                            onClick={() => {
                                handleDelete();
                            }}
                        >
                            Yes !
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
