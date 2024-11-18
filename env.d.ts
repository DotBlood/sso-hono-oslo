declare namespace NodeJS {
  interface ProcessEnv {
    // coockies
    SESSION_KEY: string;
    SESSION_SECRET: string;

    // database

    // server
    PORT: string;

    // EMAIL - SMTP
    EMAIL_HOST: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
  }
}
