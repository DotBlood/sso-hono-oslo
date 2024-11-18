import { createVerifyEmailUrl } from "@core/database/email";
import { sendMailVerifyAccaunt } from "@core/email/server";
import { CustomContext } from "@lib/context";
import { generateExpirationDate, generateRandomUrl } from "@/utils/email";

export const sendRegisterEmail = async (c: CustomContext) => {
  if (!c.var.user) {
    return c.json({ error: "Пользователь не найден" }, 500);
  }
  const url = generateRandomUrl();
  const expiresAt = generateExpirationDate(1);

  const efa = await createVerifyEmailUrl(c.var.user.id, url, expiresAt);

  await sendMailVerifyAccaunt(
    c.var.user.email,
    c.var.user.username,
    `http://localhost:3000/api/v1/auth/verify-email/${efa.url}/${c.var.user.id}/welcome`
  );
  return c.json({ sucess: true });
};
