import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { configSingleton } from "@core/config";
import type { Context as HonoContext } from "hono";

const SESSION_KEY = configSingleton.get("SESSION_KEY");
const SESSION_SECRET = configSingleton.get("SESSION_SECRET");

// Set session cookie
export async function setSessionCookie(
  c: HonoContext,
  token: string,
  maxAge: number
): Promise<void> {
  return await setSignedCookie(c, SESSION_KEY, token, SESSION_SECRET, {
    path: "/",
    httpOnly: true,
    maxAge,
  });
}

// Destroy session cookie
export function destroySessionCookie(c: HonoContext) {
  return deleteCookie(c, SESSION_KEY, { path: "/" });
}

// Get session cookie
export function getSessionCookie(c: HonoContext) {
  return getSignedCookie(c, SESSION_SECRET, SESSION_KEY);
}
