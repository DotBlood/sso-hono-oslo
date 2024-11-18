import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { Users, Session, Accaunt, UsersSetings } from "@prisma/client";
import {
  findSessionBySessionId,
  insertSession,
  updateSessionExpiresAt,
  deleteSession,
} from "@core/database/session";
import { getRandomValues } from "crypto";

export type SessionValidationResult =
  | {
      session: Session;
      user: Users;
      accaunt: Accaunt | null;
      usersSetings: UsersSetings | null;
    }
  | { session: null; user: null; accaunt: null; usersSetings: null };

// Генерация токена сессии
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

// Создание сессии
export async function createSession(
  token: string,
  userId: string
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Omit<Session, "createdAt" | "updatedAt"> = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 дней
  };

  return insertSession(session); // Используем метод для вставки сессии
}

// Проверка валидности токена сессии
export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await findSessionBySessionId(sessionId);

  if (!result || !result.usersSetings || !result.usersSetings.user) {
    return { session: null, user: null, accaunt: null, usersSetings: null };
  }

  const session = result;
  const user = result.usersSetings.user;
  const usersSetings = result.usersSetings;

  // Если сессия истекла
  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSession(session.id);
    return { session: null, user: null, accaunt: null, usersSetings: null };
  }

  // Если осталось менее 15 дней до окончания сессии — продлеваем
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await updateSessionExpiresAt(session.id, newExpiresAt);
    session.expiresAt = newExpiresAt;
  }

  return {
    session,
    user,
    accaunt: user?.accaunt || null,
    usersSetings: usersSetings || null,
  };
}

// Инвалидация сессии
export async function invalidateSession(sessionId: string): Promise<void> {
  await deleteSession(sessionId); // Удаляем сессию по ID
}
