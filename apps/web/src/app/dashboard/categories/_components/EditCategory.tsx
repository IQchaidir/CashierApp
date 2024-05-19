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
import { Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useEditCategory from '@/hooks/category/useEditCategory';
import { toast } from '@/components/ui/use-toast';

type Props = {
    name: string;
    id: string;
};
const EditCategory = ({ name, id }: Props) => {
    const [categoryName, setCategoryName] = useState(name);
    const [isOpen, setOpen] = useState(false);
    const { mutate } = useEditCategory();

    const handleEdit = async () => {
        mutate(
            { id: Number(id), name: categoryName },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Category name updated !',
                    });
                    setOpen(false);
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Category name failed to update',
                    });
                },
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Edit
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category Name</DialogTitle>
                    <DialogDescription>Product with category &quot;{name}&quot; will be changed ! </DialogDescription>
                </DialogHeader>
                <div className="grid flex-1 gap-2">
                    <Input id="link" defaultValue={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>

                <DialogFooter>
                    <button className="bg-[#04C99E] p-1 rounded-sm text-white" type="submit" onClick={handleEdit}>
                        Save changes
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default EditCategory;
