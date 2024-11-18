import { MiddlewareHandler } from "hono";
import type { Next } from "hono";
import type { Context, CustomContext } from "@lib/context";
import { validateSessionToken } from "@lib/session";
import {
  destroySessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/utils/cookies";
import { respondWithErrorJson } from "@/utils/ErrorUtils";

export const authGlobal: MiddlewareHandler<Context> = async (
  c: CustomContext,
  next: Next
) => {
  const isAuthPath = c.req.path.startsWith("/api/v1/auth/");
  const token = await getSessionCookie(c);

  if (!token) {
    // Если токен отсутствует, очищаем сессию и пользователя
    c.set("session", null);
    c.set("user", null);
    c.set("UsersSetings", null);
    c.set("accaunt", null);

    if (isAuthPath) {
      return await next();
    } else {
      console.log("Пользователь не авторизован");
      return respondWithErrorJson(c, 403, "Forbidden");
    }
  }

  // Проверяем токен
  const { user, session, accaunt, usersSetings } = await validateSessionToken(
    token
  );

  if (!session) {
    // Если сессия недействительна, удаляем cookie
    destroySessionCookie(c);

    if (isAuthPath) {
      return await next();
    } else {
      console.log("Пользователь не авторизован");
      return respondWithErrorJson(c, 401, "Unauthorized");
    }
  }
  const maxAge = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
  await setSessionCookie(c, token, maxAge);

  c.set("session", session);
  c.set("user", user);
  c.set("UsersSetings", usersSetings);
  c.set("accaunt", accaunt);

  if (isAuthPath) {
    console.log("Авторизованным пользователям запрещён доступ к /api/v1/auth/");
    return respondWithErrorJson(c, 403, "Forbidden");
  }

  await next();
};
