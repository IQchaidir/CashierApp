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

import { cn } from '@/lib/utils';
import { Toast } from '@/components/ui/toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [isOpen, setOpen] = useState(false);

    const handleCreateCategory = () => {
        // mutate(
        //   { name: categoryName },
        //   {
        //     onSuccess: () => {
        //       Toast({
        //         variant: 'success',
        //         title: 'Category created successfully !',
        //       });
        //       refetch();
        //       setOpen(false);
        //       setCategoryName('');
        //     },
        //     onError: (e: any) => {
        //       toast({
        //         variant: 'destructive',
        //         title: 'Failed to create new category!',
        //         description: `${e?.response?.data?.message}`,
        //       });
        //     },
        //   },
        // );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger>
                <Button className="flex gap-2 bg-blue-500 text-white">
                    <CircleFadingPlus className="w-4 h-4" />
                    Create Category
                </Button>
            </DialogTrigger>
            <DialogContent className="w-72">
                <DialogHeader>
                    <DialogTitle>Create New Category !</DialogTitle>
                    {/* <DialogDescription>
            Product with category &quot;{name}&quot; will be changed !{' '}
          </DialogDescription> */}
                </DialogHeader>
                <div className="grid flex-1 gap-2">
                    <Input id="link" defaultValue={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>

                <DialogFooter>
                    <Button className="bg-blue-500 text-white" type="submit" onClick={handleCreateCategory}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
