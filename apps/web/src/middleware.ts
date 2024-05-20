import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'next-client-cookies/server';

const protectedHome = ['/'];
const protectedDashboard = ['/dashboard'];

const protectedRoutes = [
    '/',
    '/cashier',
    '/shift',
    '/transaction',
    '/dashboard',
    '/dashboard/cashier',
    '/dashboard/cashier/create',
    '/dashboard/products',
    '/dashboard/products/create',
    '/dashboard/categories',
    '/dashboard/transactions',
    '/dashboard/reports',
    '/dashboard/shifts',
];
const adminOnly = [
    '/dashboard',
    '/dashboard/cashier',
    '/dashboard/cashier/create',
    '/dashboard/products',
    '/dashboard/products/create',
    '/dashboard/categories',
    '/dashboard/transactions',
    '/dashboard/reports',
    '/dashboard/shifts',
];

export default async function middleware(req: NextRequest) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL('/login/cashier', req.nextUrl.origin);
        const cookies = getCookies();
        const session: any = cookies.get('session');

        if (!session) return NextResponse.redirect(absoluteURL.toString());
        const { token, role } = await JSON.parse(session);
        if (!token) return NextResponse.redirect(absoluteURL.toString());

        if (adminOnly.includes(req.nextUrl.pathname) && role !== 'ADMIN') {
            return NextResponse.redirect(absoluteURL.toString());
        }
        if (protectedHome.includes(req.nextUrl.pathname) && role === 'CASHIER') {
            return NextResponse.redirect(new URL('/cashier', req.nextUrl.origin));
        } else if (protectedHome.includes(req.nextUrl.pathname) && role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/report', req.nextUrl.origin));
        }
        if (protectedDashboard.includes(req.nextUrl.pathname) && role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/reports', req.nextUrl.origin));
        }
    }
}
