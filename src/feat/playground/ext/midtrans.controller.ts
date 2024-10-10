import { Factory } from "hono/factory";
import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

const factory = new Factory();

export const getTransactionToken = factory.createHandlers(async (c) => {
  const { id, productName, price, quantity } = await c.req.json();

  const param = {
    item_details: {
      name: productName,
      price: price,
      quantity: quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
  };

  const transactionToken = await snap.createTransactionToken(param);

  const res = {
    status: 200,
    ok: true,
    message: "success",
    data: {
      token: transactionToken,
    },
  };

  return c.json(res, 200);
});
