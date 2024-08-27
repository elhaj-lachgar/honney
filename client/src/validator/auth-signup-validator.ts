import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthCredentials = z.object({
  password: z.string().min(6, "كلمة مرور قصيرة").max(12, "كلمة مرور طويلة"),
  email: z.string().email({ message: "البريد ليس صالحا" }),
  name : z.string().min(1,{message : "المرجو ادخال الاسم"})
});

export type TAuthCredentials = z.infer<typeof AuthCredentials>;

export const resolver = zodResolver(AuthCredentials);
