'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { validateNewProduct } from '@/lib/validation';
import { SelectCategory } from '../../create/_component/SelectCategory';
import useProductById from '@/hooks/useProductById';
import useEditProduct from '@/hooks/useEditProduct';
import EditImage from './EditImage';

async function urlToFile(url: string, filename: any, mimeType: any) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
}

export default function EditProduct({ id }: { id: string }) {
    const router = useRouter();
    const [removedFiles, setRemovedFiles] = useState<string>('');
    const [files, setFiles] = useState<File | null>(null);
    const { data: productData, isLoading: productLoading, refetch } = useProductById({ id });
    const { mutate } = useEditProduct();

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            weight: 0,
            category: '',
            description: '',
            file: null as File | null,
        },
        validationSchema: validateNewProduct,
        onSubmit: async (values) => {
            if (values.file && values.price && values.weight) {
                mutate(
                    {
                        id: Number(id),
                        name: values.name,
                        price: Number(values.price),
                        weight: Number(values.weight),
                        category: Number(values.category),
                        description: values.description,
                        file: values.file,
                    },
                    {
                        onSuccess: () => {
                            toast({
                                variant: 'success',
                                title: 'Success Edit Product !',
                            });
                            router.push('/dashboard/products');
                        },
                        onError: (res: any) => {
                            toast({
                                variant: 'destructive',
                                title: 'Failed to update product !',
                                description: res?.response?.data,
                            });
                        },
                    },
                );
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (files) {
            formik.setFieldValue('file', files);
        }
    }, [files]);

    useEffect(() => {
        const initializeForm = async () => {
            if (!productLoading && productData) {
                let file = null;
                if (productData.image) {
                    file = await urlToFile(productData.image, 'productImage.jpg', 'image/jpeg');
                }
                formik.setValues({
                    name: productData.name,
                    price: productData.price,
                    weight: productData.weight,
                    category: productData.category_id,
                    description: productData.description,
                    file: file,
                });
                setFiles(file);
            }
        };

        initializeForm();
    }, [productData, productLoading]);

    if (productLoading) return <div>Loading...</div>;

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
                <div>
                    <div className="mb-2 font-semibold">Image</div>
                    <div className="flex gap-2">
                        <EditImage
                            id="image-1"
                            file={files}
                            setFile={setFiles}
                            setRemovedFile={setRemovedFiles}
                            imageUrl={productData.image}
                        />
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
                <Button type="submit" className="bg-blue-500 text-white">
                    Submit !
                </Button>
            </div>
        </form>
    );
}
