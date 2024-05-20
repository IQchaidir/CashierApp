'use client';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

import useSession from '@/hooks/auth/useSession';
import useSignin from '@/hooks/auth/useSignIn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginAdminPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setSessionCookie, session } = useSession();
    const { mutate } = useSignin();
    const router = useRouter();

    useEffect(() => {
        if (session && session.token && session.role === 'ADMIN') {
            router.push('/dashboard/reports');
        }
    }, [session]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    toast({
                        variant: 'success',
                        title: 'Sign In Successfully!',
                    });
                    setSessionCookie({
                        id: data.id,
                        email: data.email,
                        role: data.role,
                        username: data.user_name,
                        token: data.token,
                    });
                    router.push('/dashboard/cashier');
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Sign In Failed!',
                        description: res?.response?.data,
                    });
                },
            },
        );
    };

    return (
        <div className="flex bg-gray-300 items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-xl w-96">
                <div className="p-8">
                    <Image src="/textgreen.png" alt="logologin" width={300} height={300} className="mx-auto mb-2" />
                    <Separator />
                    <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900 mb-6">Sign in as Admin</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="remember" value="true" />
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#04C99E] rounded-sm"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginAdminPage;
