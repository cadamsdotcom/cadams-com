import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;

    // Check if the request is for a path under /drafts
    if (pathname.startsWith('/drafts/')) {
        try {
            // Try to fetch the corresponding page under the root
            const response = await fetch(`${origin}${pathname.replace('/drafts/', '/')}`);

            // If the root page exists, redirect to it
            if (response.status === 200) {
                return NextResponse.redirect(`${origin}${pathname.replace('/drafts/', '/')}`);
            }
        } catch (error) {
            console.error('Error fetching root page:', error);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/drafts/:path*'],
};