import nodemailer from "nodemailer";
import { configSingleton } from "@core/config";
import ReactDOMServer from "react-dom/server";
import { EmailVerifyAccount } from "../client/EmailVerifyAccaunt";
import React from "react";

const EMAIL_HOST = configSingleton.get("EMAIL_HOST");
const EMAIL_USER = configSingleton.get("EMAIL_USER");
const EMAIL_PASS = configSingleton.get("EMAIL_PASS");

// Настройка Nodemailer
export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendMailVerifyAccaunt = async (
  to: string,
  username?: string,
  btnLink?: string,
  text?: string
) => {
  let htmlContent: string | undefined = undefined;

  if (username && btnLink) {
    htmlContent = ReactDOMServer.renderToStaticMarkup(
      <EmailVerifyAccount username={username} btnLink={btnLink} />
    );
  }

  return await transporter.sendMail({
    from: '"My-cloud ☁️" <NanoLab-Team@yandex.ru>',
    to,
    subject: "Добро пожаловать в My-Cloud! ☁️",
    html: htmlContent,
  });
};

export const sendMailToAdmin = async (
  subject: string,
  text?: string,
  html?: string
) => {
  return await transporter.sendMail({
    from: '"My-cloud ☁️ to Admin" <NanoLab-Team@yandex.ru>',
    to: "nlxlogemail@gmail.com",
    subject,
    text,
    html,
  });
};
