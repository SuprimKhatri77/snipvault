import { createRouteMatcher, clerkMiddleware } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api/stripe/webhook")) {
    // Return nothing → Next.js continues to your route.ts
    return;
  }
  const { userId, redirectToSignIn } = await auth();

  if (userId && req.nextUrl.pathname === "/") {
    const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
    return new Response(null, {
      status: 307,
      headers: {
        Location: dashboardUrl.toString(),
      },
    });
  }

  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    return new Response(null, {
      status: 307,
      headers: {
        Location: signInUrl.toString(),
      },
    });
  }
});

export const config = {
  matcher: [
    // Everything except Next.js internals & static assets,
    // BUT NOT the Stripe webhook:
    "/((?!_next|.*\\.(?:js|css|png|jpg|jpeg|webp|svg|ico)|api/stripe/webhook).*)",
  ],
};
