import { Hono } from "hono";
import { registerValidator, verifyEmailValidator } from "@/utils/validator";
import { registerController, verifyEmailController } from "@controller/auth";
import type { Context } from "@lib/context";
import { sendRegisterEmail } from "@controller/auth";

// Регистрация маршрутов
const authRouter = new Hono<Context>().basePath("/v1/auth/");

// Обработчик регистрации
authRouter.post(
  "/register",
  registerValidator,
  registerController,
  sendRegisterEmail
);

authRouter.get(
  "/verify-email/:url/:userId/:redirect",
  verifyEmailValidator,
  verifyEmailController
);

export { authRouter };
