import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const OrderStatusCredentials = z.object({
  email: z.string().email({message: "البريد ليس صالحا" }),
  orderId: z.string().min(1, { message: "رقم الطلب ليس صالحا"}),
});

export type TOrderStatusCredentials = z.infer<typeof OrderStatusCredentials>;

export const resolver = zodResolver(OrderStatusCredentials);
