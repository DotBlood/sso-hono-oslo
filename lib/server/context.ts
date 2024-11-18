import type { Env } from "hono";
import type { Context as HonoContext } from "hono";
import type { Users, Session, Accaunt, UsersSetings } from "@prisma/client";

export interface Context extends Env {
  Variables: {
    user: Users | null;
    session: Session | null;
    accaunt: Accaunt | null;
    UsersSetings: UsersSetings | null;
  };
}

export interface CustomContext extends HonoContext<Context> {}
