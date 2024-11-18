import { CustomContext } from "@lib/context";
import { Context as HonoContext } from "hono";

import { StatusCode } from "hono/utils/http-status";

export async function respondWithErrorJson(
  c: CustomContext | HonoContext,
  status: StatusCode,
  message: string | object
) {
  return c.json(message, status);
}
