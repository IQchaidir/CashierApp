import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CircleFadingPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useCreateCategory from '@/hooks/category/useCreateCategory';
import { toast } from '@/components/ui/use-toast';

export default function CreateNewCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [isOpen, setOpen] = useState(false);
    const { mutate, isPending } = useCreateCategory();

    const handleCreateCategory = () => {
        mutate(
            { name: categoryName },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Category created successfully !',
                    });
                    setOpen(false);
                    setCategoryName('');
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Failed to create new category!',
                        description: `${res?.response?.data}`,
                    });
                },
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <button className="text-emerald-500 font-medium cursor-pointer">Create New Category</button>
            </DialogTrigger>
            <DialogContent className="w-72">
                <DialogHeader>
                    <DialogTitle>Create New Category !</DialogTitle>
                </DialogHeader>
                <div className="grid flex-1 gap-2">
                    <Input id="link" defaultValue={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <DialogFooter>
                    <button
                        className="bg-[#04C99E] rounded-sm p-1 text-white"
                        type="submit"
                        onClick={handleCreateCategory}
                    >
                        Create
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
