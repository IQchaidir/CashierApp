'use client';
import Uploader from './Uploader';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useCreateProduct from '@/hooks/product/useCreateProduct';
import { toast } from '@/components/ui/use-toast';
import { validateNewProduct } from '@/lib/validation';
import { SelectCategory } from './SelectCategory';
import CreateNewCategory from './CreateNewCategory';

export default function CreateProduct() {
    const [files, setFiles] = useState<File | null>(null);
    const { mutate } = useCreateProduct();
    const router = useRouter();

    useEffect(() => {
        if (files) {
            formik.setFieldValue('file', files);
        }
    }, [files]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            weight: 0,
            category: '',
            description: '',
            file: files,
        },
        validationSchema: validateNewProduct,
        onSubmit: async (values) => {
            if (files && values.price && values.weight) {
                mutate(
                    {
                        name: values.name,
                        price: Number(values.price),
                        weight: Number(values.weight),
                        category: Number(values.category),
                        description: values.description,
                        file: files,
                    },
                    {
                        onSuccess: () => {
                            toast({
                                variant: 'success',
                                title: 'Product created successfully !',
                            });
                            router.push('/dashboard/products');
                        },
                        onError: (res: any) => {
                            toast({
                                variant: 'destructive',
                                title: 'Failed to create product !',
                                description: res?.response?.data,
                            });
                        },
                    },
                );
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
                <div>
                    <div className="mb-2 font-semibold">Image</div>
                    <div className="flex gap-2">
                        <Uploader id="image-1" file={files} setFile={setFiles} />
                    </div>
                    {formik.errors.file && <div className="text-xs text-red-500">{formik.errors.file}</div>}
                </div>

                <div>
                    <div className="mb-2 font-semibold">Product Name</div>
                    <Input
                        name="name"
                        type="text"
                        className="border-slate-300"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-xs text-red-500">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="flex gap-2 w-full">
                    <div className="w-1/2">
                        <div className="mb-2 font-semibold">Price</div>
                        <Input
                            name="price"
                            type="number"
                            placeholder="Rp."
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            className="border-slate-300"
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
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            className="border-slate-300"
                        />
                        {formik.touched.weight && formik.errors.weight ? (
                            <div className="text-xs text-red-500">{formik.errors.weight}</div>
                        ) : null}
                    </div>
                </div>

                <div>
                    <div className="mb-2 font-semibold">Category</div>
                    <SelectCategory
                        value={formik.values.category}
                        onChange={(value) => formik.setFieldValue('category', value)}
                    />
                    <div className="mt-2">
                        Are categories not available? <CreateNewCategory />
                    </div>
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-xs text-red-500">{formik.errors.category}</div>
                    ) : null}
                </div>

                <div>
                    <div className="mb-2 font-semibold">Description</div>
                    <Textarea className="border-slate-300" {...formik.getFieldProps('description')} />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-xs text-red-500">{formik.errors.description}</div>
                    ) : null}
                </div>
                <button type="submit" className="bg-[#04C99E]  text-white p-2 rounded-sm">
                    Submit !
                </button>
            </div>
        </form>
    );
}
