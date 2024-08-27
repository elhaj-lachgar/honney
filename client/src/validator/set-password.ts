import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const setPasswordCredentials = z.object({
  new_password: z.string().min(6, "كلمة المرور قصيرة").max(12, "كلمة المرور طويلة"),
});

export type TSetPasswordCredentials = z.infer<typeof setPasswordCredentials>;

export const resolver = zodResolver(setPasswordCredentials);
