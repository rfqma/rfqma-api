import { Hono } from "hono";
import { getHealth } from "./health.controller";

export const health = new Hono().basePath("/health");

health.get("/", ...getHealth);
