import {
  findVerifyEmailUrlByUrlandUserId,
  deleteVerifyEmailUrl,
} from "@core/database/email";
import { verifyEmail } from "@core/database/userSetings";
export async function verifyEmailUrl(userId: string, url: string) {
  const verifyEmailUrl = await findVerifyEmailUrlByUrlandUserId(url, userId);
  if (verifyEmailUrl) {
    await deleteVerifyEmailUrl(verifyEmailUrl.url, verifyEmailUrl.userId);
    await verifyEmail(verifyEmailUrl.userId);
    return true;
  }
  return false;
}
