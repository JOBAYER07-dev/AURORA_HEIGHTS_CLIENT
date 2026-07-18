import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Protect paths: /items/add and /items/manage
  if (pathname.startsWith("/items/add") || pathname.startsWith("/items/manage")) {
    if (!token) {
      // Redirect to login page and attach target redirection path as a query param
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add/:path*", "/items/manage/:path*"],
};
