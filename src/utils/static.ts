export const notFound = {
  status: 404,
  ok: false,
  message: "route not found",
};

export const corsConfig = {
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowHeaders: [],
  exposeHeaders: [],
};
