import {withAuth} from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
)

export const config = {
    // Match all routes except for the ones starting with _next/static, _next/image, favicon.ico, and public
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ]
}