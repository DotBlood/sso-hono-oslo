import { respondWithErrorJson } from "@/utils/ErrorUtils";
import { findUserAccauntById } from "@core/database/accaunt";
import { findUserByUsername } from "@core/database/user";
import { getUserSetings } from "@core/database/userSetings";
import { CustomContext } from "@lib/context";
import { createSession, generateSessionToken } from "@lib/session";

// Функция для отправки EFA токена
async function handleEFA(userId: string, c: CustomContext) {
  // TODO: Реализовать создание и отправку EFA токена
  return;
}

// Функция для отправки TFA токена
async function handleTFA(userId: string, c: CustomContext) {
  // TODO: Реализовать создание и отправку TFA токена
  return;
}

export const LoginController = async (c: CustomContext) => {
  try {
    const { username, password } = c.req.valid("json");

    // Поиск пользователя по имени
    const userInDb = await findUserByUsername(username);
    if (!userInDb) {
      return respondWithErrorJson(c, 400, "Invalid username or password");
    }

    // Получаем настройки пользователя
    const userSetings = await getUserSetings(userInDb.id);

    // Обработка EFA и TFA, если они активированы
    if (userSetings?.efa) {
      await handleEFA(userInDb.id, c); // Обработка EFA
    }
    if (userSetings?.tfa) {
      await handleTFA(userInDb.id, c); // Обработка TFA
    }

    // Проверка пароля
    const vpass = Bun.password.verify(password, userInDb.password);
    if (!vpass) {
      return respondWithErrorJson(c, 400, "Invalid username or password");
    }

    // Генерация токена и создание сессии
    const token = generateSessionToken();
    const session = await createSession(token, userInDb.id);

    // Получение аккаунта пользователя
    const accaunnt = await findUserAccauntById(userInDb.id);

    // Устанавливаем данные сессии и пользователя в контекст
    c.set("session", session);
    c.set("user", userInDb);
    c.set("accaunt", accaunnt);
    c.set("UsersSetings", userSetings);

    // Возвращаем успешный ответ
    c.json({ success: true });

  } catch (error) {
    // Обработка ошибок
    console.error("LoginController Error:", error);
    return respondWithErrorJson(c, 500, "Internal server error");
  }
};
