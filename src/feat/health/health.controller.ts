import { Factory } from "hono/factory";

const factory = new Factory();

export const getHealth = factory.createHandlers(async (c) => {
  const res = {
    status: 200,
    ok: true,
    message: "health check passed",
  };
  return c.json(res, 200);
});
