import { Hono } from "hono";
import { getIndex } from "./index.controller";

export const index = new Hono().basePath("/");

index.get("/", ...getIndex);
