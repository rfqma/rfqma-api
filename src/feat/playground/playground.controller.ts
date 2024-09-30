import { Factory } from "hono/factory";

const factory = new Factory();

export const getPlayground = factory.createHandlers(async (c) => {
  const res = {
    status: 200,
    ok: true,
    message: "success",
    data: {
      routes: [
        {
          label: "BMKG",
          desc: "route for BMKG API",
          path: `${process.env.BASE_URL}/playground/bmkg`,
        },
      ],
    },
  };
  return c.json(res, 200);
});
