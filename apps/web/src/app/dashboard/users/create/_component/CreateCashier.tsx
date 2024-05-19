'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useCreateCashier from '@/hooks/cashier/useCreateCashier';
import { validateNewCashier } from '@/lib/validation';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export default function CreateCashier() {
    const router = useRouter();
    const { mutate } = useCreateCashier();

    const formik: any = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validateNewCashier,
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
                    user_name,
                    email,
                    password,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: 'success',
                            title: 'Cashier created successfully !',
                        });
                        router.push('/dashboard/users');
                    },
                    onError: (res: any) => {
                        toast({
                            variant: 'destructive',
                            title: 'Failed to create cashier !',
                            description: res?.response?.data,
                        });
                    },
                },
            );
        },
    });

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
                <button className="border bg-[#04C99E] text-white p-2 rounded-md font-medium ">Submit !</button>
            </div>
        </form>
    );
}
