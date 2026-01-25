import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccessMap } from "./lib/settings";

const protectedMatchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();
  const pathname = req.nextUrl.pathname;

  /* =====================
     🌍 PUBLIC ROUTES
  ====================== */
  if (
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/p/student/")
  ) {
    return NextResponse.next();
  }

  /* =====================
     🔒 NOT LOGGED IN
  ====================== */
  if (!sessionClaims) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = (sessionClaims.metadata as { role?: string })?.role;

  // ❗ No role = force logout (prevents infinite redirect)
  if (!role) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  /* =====================
     🧠 ROLE ACCESS CHECK
  ====================== */
  for (const { matcher, allowedRoles } of protectedMatchers) {
    if (matcher(req) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|p/student|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
