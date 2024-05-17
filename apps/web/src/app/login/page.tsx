'use client';
import { toast } from '@/components/ui/use-toast';
import useAdminSignIn from '@/hooks/useAdminSignIn';
import useSession from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setSessionCookie } = useSession();
    const [loginType, setLoginType] = useState('admin');
    const { mutate } = useAdminSignIn();
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    toast({
                        variant: 'success',
                        title: 'Sign In Successfully !',
                    });
                    setSessionCookie({
                        id: data.id,
                        email: data.email,
                        role: data.role,
                        username: data.user_name,
                        token: data.token,
                    });
                    if (loginType === 'admin') {
                        router.push('/dashboard');
                    } else if (loginType === 'cashier') {
                        router.push('/cashier');
                    }
                },
                onError: (res: any) => {
                    toast({
                        variant: 'destructive',
                        title: 'Sign In Failed !',
                        description: res?.response?.data,
                    });
                },
            },
        );
    };

    return (
        <div className="flex bg-gray-300 items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-xl w-96">
                <div className="flex justify-between">
                    <button
                        className={`text-lg font-medium border-b-2 border-r-2 w-full h-12  ${
                            loginType === 'admin' ? 'text-indigo-600 shadow-sm' : 'text-gray-400'
                        } focus:outline-none`}
                        onClick={() => setLoginType('admin')}
                    >
                        Admin
                    </button>
                    <button
                        className={`text-lg font-medium border-b-2 w-full  ${
                            loginType === 'cashier' ? 'text-indigo-600 shadow-sm' : 'text-gray-400'
                        } focus:outline-none`}
                        onClick={() => setLoginType('cashier')}
                    >
                        Cashier
                    </button>
                </div>
                <div className="p-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                        Sign in as {loginType === 'admin' ? 'admin' : 'cashier'}
                    </h2>
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
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default LoginPage;
