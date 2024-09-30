import { Hono } from "hono";
import { getHTML } from "./html.controller";

export const html = new Hono().basePath("/html");

html.get("/", ...getHTML);
