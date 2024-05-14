import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/providers/CartContext';

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
                    <CartProvider>
                        <Navbar />
                        {children}
                    </CartProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
