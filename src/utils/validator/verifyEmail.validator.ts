import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const verifyEmailValidator = zValidator(
  "param",
  z.object({
    url: z
      .string({ message: "token must be a valid string" })
      .min(128, { message: "token must be at least 128 characters long" })
      .max(256, { message: "token must be at most 128 characters long" }),

    userId: z
      .string({ message: "userID must be a valid string" })
      .uuid({ message: "userId must be a valid UUID" }),
    
    redirect: z
      .string({ message: "redirect must be a valid string" })
      .min(1, { message: "redirect must be at least 1 character long" })
      .max(512, { message: "redirect must be at most 512 characters long" }),

  })
);
