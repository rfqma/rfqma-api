import { Factory } from "hono/factory";

const factory = new Factory();

const HTML = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  );
};

export const getHTML = factory.createHandlers(async (c) => {
  return c.html(<HTML />, 200);
});
