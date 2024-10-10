import { Hono } from "hono";
import { getPlayground } from "./playground.controller";
import { getBMKG, getNewestEQ, getLatestEQ } from "./ext/bmkg.controller";
import { getTransactionToken } from "./ext/midtrans.controller";

export const playground = new Hono().basePath("/playground");

playground.get("/", ...getPlayground);
playground.get("/bmkg", ...getBMKG);
playground.get("/bmkg/newest-eq", ...getNewestEQ);
playground.get("/bmkg/latest-eq", ...getLatestEQ);
playground.post("/midtrans", ...getTransactionToken);
