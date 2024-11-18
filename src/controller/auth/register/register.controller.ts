import { createSession, generateSessionToken } from "@lib/session";
import {
  findUserByEmail,
  findUserByUsername,
  createUser,
} from "@core/database/user";
import { respondWithErrorJson } from "@/utils/ErrorUtils";
import { setSessionCookie } from "@/utils/cookies";
import type { CustomContext } from "@lib/context";
import { Next } from "hono";
import { createUserSetings } from "@core/database/userSetings";
import { createUserAccaunt } from "@core/database/accaunt";

export const registerController = async (c: CustomContext, next: Next) => {
  // Получаем валидированные данные
  const { username, email, password } = c.req.valid("json");

  // Проверка существования email или username
  const [emailExists, usernameExists] = await Promise.all([
    findUserByEmail(email),
    findUserByUsername(username),
  ]);

  if (emailExists || usernameExists) {
    return respondWithErrorJson(c, 401, {
      error: "Email or Username already exists",
    });
  }

  const hashPassword = await Bun.password.hash(password);
  // Создание пользователя
  const newUser = await createUser({ username, email, password: hashPassword });
  const accaunnt = await createUserAccaunt(newUser.id, username);
  const userSetings = await createUserSetings(newUser.id);

  // Генерация токена и создание сессии
  const token = generateSessionToken();
  const session = await createSession(token, newUser.id);

  // Установка cookie
  const maxAge = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
  await setSessionCookie(c, token, maxAge);

  c.set("session", session);
  c.set("user", newUser);
  c.set("accaunt", accaunnt);
  c.set("UsersSetings", userSetings);

  // Ответ с токеном
  return await next();
};
