import { respondWithErrorJson } from "@/utils/ErrorUtils";
import { CustomContext } from "@lib/context";
import { verifyEmailUrl } from "@lib/email";

export const verifyEmailController = async (c: CustomContext) => {
  const { userId, redirect, url } = c.req.valid("param");
  const verify = await verifyEmailUrl(userId, url);

  if (verify) {
    return c.redirect("http://localhost:3000/" + redirect + "/", 300);
  } else {
    return respondWithErrorJson(c, 400, "Invalid URL");
  }
};
