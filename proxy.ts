import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
dotenv.config({
  path: '.env',
});

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token')?.value;

  const getAuthUser = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        cookie: `access_token=${accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error('Auth failed');
      return res.json();
    });
  };

  if (pathname.startsWith('/auth/login')) {
    try {
      await getAuthUser();
      return NextResponse.redirect(new URL('/', req.url));
    } catch (error) {
      console.error('Token validation error:', error);
      return NextResponse.next();
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    await getAuthUser();
    return NextResponse.next();
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: ['/', '/auth/login'],
};
