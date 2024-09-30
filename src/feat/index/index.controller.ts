import { Factory } from "hono/factory";

const factory = new Factory();

export const getIndex = factory.createHandlers(async (c) => {
  const res = {
    status: 200,
    ok: true,
    message: "Hello!",
    data: {
      name: "rfqma-api",
      version: "0.1",
      routes: [
        {
          label: "Health",
          desc: "route to check health",
          path: `${process.env.BASE_URL}/health`,
        },
        {
          label: "HTML",
          desc: "route to return HTML",
          path: `${process.env.BASE_URL}/html`,
        },
        {
          label: "Playground",
          desc: "route for rfqma/nextjs-playground app",
          path: `${process.env.BASE_URL}/playground`,
        },
      ],
    },
  };
  return c.json(res, 200);
});
