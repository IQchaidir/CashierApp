'use client';
import Uploader from './Uploader';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreateProduct() {
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();

    const formik: any = useFormik({
        initialValues: {
            name: '',
            price: 0,
            weight: 0,
            category: '',
            description: '',
        },

        onSubmit: async ({ name, price, weight, category, description }) => {
            // mutate(
            //   {
            //     name,
            //     price,
            //     weight,
            //     category,
            //     description,
            //     files: files,
            //   },
            //   {
            //     onSuccess: () => {
            //       toast({
            //         variant: 'success',
            //         title: 'Product created successfully !',
            //       });
            //       router.push('/dashboard/products');
            //     },
            //     onError: (res: any) => {
            //       toast({
            //         variant: 'destructive',
            //         title: 'Failed to create product !',
            //         description: res?.response?.data?.message,
            //       });
            //     },
            //   },
            // );
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
                {/* image section */}
                <div>
                    <div className="mb-2 font-semibold">Image</div>
                    <div className="flex gap-2">
                        <Uploader id="image-1" files={files} setFiles={setFiles} />
                    </div>
                </div>
                {/* name */}
                <div>
                    <div className="mb-2 font-semibold">Product Title</div>
                    <Input name="name" type="text" className="border-slate-300" {...formik.getFieldProps('name')} />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-xs text-red-500">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="flex gap-2 w-full">
                    {/* price */}
                    <div className="w-1/2">
                        <div className="mb-2 font-semibold">Price</div>
                        <Input
                            name="price"
                            type="number"
                            placeholder="Rp."
                            className="border-slate-300"
                            {...formik.getFieldProps('price')}
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="text-xs text-red-500">{formik.errors.price}</div>
                        ) : null}
                    </div>

                    <div className="w-1/2">
                        <div className="mb-2 font-semibold">Weight</div>
                        <Input
                            name="weight"
                            type="number"
                            placeholder="grams."
                            className="border-slate-300"
                            {...formik.getFieldProps('weight')}
                        />
                        {formik.touched.weight && formik.errors.weight ? (
                            <div className="text-xs text-red-500">{formik.errors.weight}</div>
                        ) : null}
                    </div>
                </div>
                <div>
                    <div className="mb-2 font-semibold">Category</div>
                </div>

                {/* description */}
                <div>
                    <div className="mb-2 font-semibold">Description</div>
                    <Textarea
                        name="description"
                        className="border-slate-300"
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-xs text-red-500">{formik.errors.description}</div>
                    ) : null}
                </div>
                <Button className="bg-blue-500 text-white">Submit !</Button>
            </div>
        </form>
    );
}
