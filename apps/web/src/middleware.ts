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
    '/checkout',
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
    /^\/dashboard\/products\/\d+$/,
    /^\/dashboard\/cashier\/\d+$/,
];

const adminOnlyDynamicRoutes = [/^\/dashboard\/products\/\d+$/, /^\/dashboard\/cashier\/\d+$/];

export default async function middleware(req: NextRequest) {
    const allProtectedRoutes = protectedRoutes.concat(adminOnlyDynamicRoutes.map((pattern) => pattern.source));
    const isProtectedRoute =
        protectedRoutes.includes(req.nextUrl.pathname) ||
        adminOnlyDynamicRoutes.some((pattern) => pattern.test(req.nextUrl.pathname));

    if (isProtectedRoute) {
        const absoluteURL = new URL('/login/cashier', req.nextUrl.origin);
        const cookies = getCookies();
        const session: any = cookies.get('session');

        if (!session) return NextResponse.redirect(absoluteURL.toString());
        const { token, role } = JSON.parse(session);
        if (!token) return NextResponse.redirect(absoluteURL.toString());

        if (adminOnly.includes(req.nextUrl.pathname) && role !== 'ADMIN') {
            return NextResponse.redirect(absoluteURL.toString());
        }

        if (adminOnlyDynamicRoutes.some((pattern) => pattern.test(req.nextUrl.pathname)) && role !== 'ADMIN') {
            return NextResponse.redirect(absoluteURL.toString());
        }

        if (protectedHome.includes(req.nextUrl.pathname) && role === 'CASHIER') {
            return NextResponse.redirect(new URL('/cashier', req.nextUrl.origin));
        } else if (protectedHome.includes(req.nextUrl.pathname) && role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/reports', req.nextUrl.origin));
        }

        if (protectedDashboard.includes(req.nextUrl.pathname) && role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/reports', req.nextUrl.origin));
        }
    }

    return NextResponse.next();
}
