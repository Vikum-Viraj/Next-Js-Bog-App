import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (e) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // Define public paths that don't require authentication
    const isPublicPath = ['/auth/login', '/auth/signup', '/'].includes(path) || 
                         (path.startsWith('/blog/') && !path.includes('/create') && !path.includes('/update') && !path.match(/^\/blog$|^\/blog\/$/));
    
    // Get auth token from cookies
    const authToken = request.cookies.get(process.env.COOKIE_KEY || 'auth_token')?.value || '';
    
    // Verify token
    const payload = await verifyToken(authToken);
    const userId = payload?.userId;

    // Redirect to login if accessing protected route without authentication
    if (!isPublicPath && !userId) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Redirect authenticated users away from login/signup pages
    if ((path === '/auth/login' || path === '/auth/signup') && userId) {
        return NextResponse.redirect(new URL('/blog', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth/login',
        '/auth/signup',
        '/blog',
        '/blog/create',
        '/blog/update/:path*',
        '/user/profile',
        '/api/blog/save',
        '/api/blog/update',
        '/api/blog/delete'
    ]
}
