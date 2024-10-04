import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// Define secret key for JWT verification (store in .env file in production)
const secret = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
  const token = localStorage.get('token'); // or you can check headers

  // Check if the token exists
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token using JWT
    // jwt.verify(token, secret);
    // If token is valid, continue the request
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define paths to apply middleware to
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // paths that require user verification
};
