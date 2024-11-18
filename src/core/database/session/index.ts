import prisma from "@lib/prisma";
import { Session, Users, UsersSetings, Accaunt } from "@prisma/client";

// Создание сессии
export async function insertSession(
  data: Omit<Session, "createdAt" | "updatedAt">
): Promise<Session> {
  return prisma.session.create({
    data,
  });
}

// Поиск сессии по ID с пользователем
export async function findSessionBySessionId(sessionId: string): Promise<
  | (Session & {
      usersSetings:
        | (UsersSetings & {
            user:
              | (Users & {
                  accaunt: Accaunt | null;
                })
              | null;
          })
        | null;
    })
  | null
> {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      usersSetings: {
        include: {
          user: {
            include: {
              accaunt: true,
            },
          },
        },
      },
    },
  });
}

// Поиск сессии по ID пользователя с пользователем
export async function findSessionByUserId(userId: string): Promise<
  | (Session & {
      usersSetings:
        | (UsersSetings & {
            user:
              | (Users & {
                  accaunt: Accaunt | null;
                })
              | null;
          })
        | null;
    })
  | null
> {
  return await prisma.session.findFirst({
    where: { userId },
    include: {
      usersSetings: {
        include: {
          user: {
            include: {
              accaunt: true,
            },
          },
        },
      },
    },
  });
}

// Удаление сессии по ID
export async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: { id: sessionId },
  });
}

// Удаление всех сессий пользователя
export async function deleteAllUserSessionsByUserId(
  userId: string
): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

// Обновление сессии (продление срока действия)
export async function updateSessionExpiresAt(
  sessionId: string,
  expiresAt: Date
): Promise<void> {
  await prisma.session.update({
    where: { id: sessionId },
    data: { expiresAt },
  });
}
