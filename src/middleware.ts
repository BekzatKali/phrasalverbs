import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export function middleware(req: NextApiRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
