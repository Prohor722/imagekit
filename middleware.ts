import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        if (
          pathname === "/" ||
          pathname.startsWith("/api/videos") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/api/videos")
        ) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  // Match all routes except for the ones starting with _next/static, _next/image, favicon.ico, and public
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
