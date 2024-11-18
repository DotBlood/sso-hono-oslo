import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const loginValidator = zValidator(
  "json",
  z.object({
    username: z
      .string({ message: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(256, { message: "Username must be at most 256 characters long" }),
    password: z
    .string({ message: "Password is required" })
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(256, { message: "Password must be at most 256 characters long" }),
  })
);
