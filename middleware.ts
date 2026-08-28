import { NextRequest, NextResponse } from "next/server";

const origin = (value: string | undefined) => {
  if (!value) return "";
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return "";
  }
};

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const apiOrigin = origin(process.env.NEXT_PUBLIC_API_URL);
  const imageOrigin = origin(process.env.NEXT_PUBLIC_IMAGE_URL);
  const authDomain = origin(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
  const connectSources = [
    "'self'",
    apiOrigin,
    authDomain,
    "https://identitytoolkit.googleapis.com",
    "https://securetoken.googleapis.com",
    "https://www.googleapis.com",
  ].filter(Boolean);
  const imageSources = ["'self'", "data:", "blob:", imageOrigin].filter(Boolean);
  const frameSources = ["'self'", authDomain].filter(Boolean);
  const csp = [
    "default-src 'self'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "form-action 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imageSources.join(" ")}`,
    "font-src 'self' data:",
    `connect-src ${connectSources.join(" ")}`,
    `frame-src ${frameSources.join(" ")}`,
    "worker-src 'self' blob:",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js).*)"],
};
