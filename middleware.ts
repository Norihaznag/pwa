import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// Define secret key for JWT verification (store in .env file in production)
const secret = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token');
    console.log(token)

  // Check if the token exists
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/admin/', req.url));
  }

  try {
   
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/admin/', req.url));
  }
}

// Define paths to apply middleware to
export const config = {
  matcher: ['/admin/dashboard/:path*'], // paths that require user verification
};
