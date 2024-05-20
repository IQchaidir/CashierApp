'use client';

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { ChevronsUpDown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import useCashierById from '@/hooks/cashier/useCashierById';
import { useEffect } from 'react';
import useEditCashier from '@/hooks/cashier/useEditCashier';
import { validateUpdateCashier } from '@/lib/validation';

export default function EditUser({ id }: { id: number }) {
    const router = useRouter();
    const { data, isLoading } = useCashierById({ id });
    const { mutate } = useEditCashier();

    const formik: any = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        enableReinitialize: true,
        validationSchema: validateUpdateCashier,
        onSubmit: ({ user_name, email, password, confirmPassword }) => {
            if (password !== confirmPassword) {
                toast({
                    variant: 'destructive',
                    title: 'Password not equals !',
                });
                return;
            }
            mutate(
                {
                    id,
                    user_name,
                    email,
                    password,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: 'success',
                            title: 'Admin edited successfully !',
                        });
                        router.push('/dashboard/users');
                        setTimeout(() => {
                            window.location.reload();
                        }, 150);
                    },
                    onError: (res: any) => {
                        toast({
                            variant: 'destructive',
                            title: 'Failed to edit users !',
                            description: res?.response?.data?.message,
                        });
                    },
                },
            );
        },
    });

    useEffect(() => {
        if (!isLoading && data) {
            formik.setFieldValue('user_name', data?.user_name);
            formik.setFieldValue('email', data?.email);
        }
    }, [data, isLoading]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
                <div>
                    <div className="mb-2 font-semibold">Username</div>
                    <Input
                        name="user_name"
                        type="text"
                        className="border-slate-300"
                        {...formik.getFieldProps('user_name')}
                    />
                    {formik.touched.user_name && formik.errors.user_name ? (
                        <div className="text-xs text-red-500">{formik.errors.user_name}</div>
                    ) : null}
                </div>
                <div>
                    <div className="mb-2 font-semibold">Email</div>
                    <Input name="email" type="email" className="border-slate-300" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-xs text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="relative">
                    <Collapsible className="absolute lg:static top-0 w-full">
                        <CollapsibleTrigger className="w-full flex items-center justify-between text-sm font-light text-gray-700">
                            Do you want to change password ?
                            <ChevronsUpDown className="w-4 h-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 py-4 CollapsibleContent">
                            <div>
                                <div className="mb-2 font-semibold">Password</div>
                                <Input
                                    name="password"
                                    type="password"
                                    className="border-slate-300"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-xs text-red-500">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <div className="mb-2 font-semibold">Confirm Password</div>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    className="border-slate-300"
                                    {...formik.getFieldProps('confirmPassword')}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-xs text-red-500">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                <button className="border bg-[#04C99E] text-white p-2 rounded-md font-medium ">Submit !</button>
            </div>
        </form>
    );
}
