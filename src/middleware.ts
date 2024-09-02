import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const isPublicPath = path === '/' || path === '/login' || path === '/signup';

    console.log(`Requested path: ${path}`);
    console.log(`Token found: ${!!token}`);

    // Case 1: If the user is authenticated and on a public path, redirect to /header
    if (isPublicPath && token) {
        console.log('User is authenticated and accessing a public path, redirecting to /header');
        return NextResponse.redirect(new URL('/header', request.nextUrl));
    }

    // Case 2: If the user is not authenticated and on a private path, redirect to /
    if (!isPublicPath && !token) {
        console.log('User is not authenticated and accessing a private path, redirecting to /');
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Allow access to the requested page
    console.log('Allowing access to the requested path');
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/signup', '/header'],
};
