import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
const isProduction = false;

export default function middleware(req: NextRequest) {
  // Does not matter which return value is used here.
  // return NextResponse.next();
  return;
}
