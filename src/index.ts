import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { authRouter } from "@router/v1";
import { Context } from "@lib/context";
import { authGlobal } from "@mv/v1";
import { rateLimiter } from "hono-rate-limiter";

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  keyGenerator: () => "<unique_key>",
  message: { sucess: false, error: "Too Many Requests" },
});

// init application
const app = new Hono<Context>();

app.use(logger());
app.use(
  prettyJSON({
    space: 2,
  })
);
app.use(limiter);

// auth global mw
app.use(authGlobal);

// authRouter
app.route("/api", authRouter);

//error handler
app.all("*", (c) => c.json({ error: "404 | Not Found" }, 404));

export default app;
