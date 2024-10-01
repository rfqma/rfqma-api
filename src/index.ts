import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import "dotenv/config";
import { corsConfig, notFound } from "./utils/static";
import { health } from "./feat/health/health.route";
import { html } from "./feat/html/html.route";
import { index } from "./feat/index/index.route";
import { playground } from "./feat/playground/playground.route";

const app = new Hono().basePath("/");
// const app = new Hono().basePath("/v1");

app.use(logger(), prettyJSON());
app.use("*", cors(corsConfig));

app.notFound((c) => c.json(notFound, 404));

app.route("/", index);
app.route("/", health);
app.route("/", html);
app.route("/", playground);

const port = parseInt(process.env.PORT!) || 3025;
console.log(`🚀 Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
