import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import Navbar from '@/components/Navbar';
import { CookiesProvider } from 'next-client-cookies/server';
import { CartProvider } from '@/providers/CartContext';
import { Toaster } from '@/components/ui/toaster';
import ApplicationWrapper from '@/components/ApplicationWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SmartKasir',
    description: 'POS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    <CookiesProvider>
                        <CartProvider>
                            <ApplicationWrapper>
                                {children}
                                <Toaster />
                            </ApplicationWrapper>
                        </CartProvider>
                    </CookiesProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
