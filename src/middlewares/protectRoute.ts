// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';

export async function middleware(req: NextRequest) {
    try {
        const token = req.cookies.get('jwt')?.value || '';

        if (!token) return NextResponse.redirect(new URL('/', req.url));

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }

        const decoded: any = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return NextResponse.redirect(new URL('/header', req.url));

        // Attach user data to request object
        (req as any).user = user;

        return NextResponse.next({
            
        });

    } catch (error: any) {
        console.error('Error:', error.message);
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/protected/*'], // Apply to specific paths
};
