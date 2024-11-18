import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const registerValidator = zValidator(
  "json",
  z.object({
    username: z
      .string({ message: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(256, { message: "Username must be at most 256 characters long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please enter a valid email address" })
      .min(5, { message: "Email must be at least 5 characters long" })
      .max(256, { message: "Email must be at most 256 characters long" }),
    password: z
      .string({ message: "Password is required" })
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(256, { message: "Password must be at most 256 characters long" }),
  })
);
