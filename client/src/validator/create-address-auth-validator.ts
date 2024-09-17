import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAddressCredentials = z.object({
  phone: z
    .string()
    .length(9, { message: "الرجاء إدخال رقم الهاتف مثال.624568920" }),
  city: z.string().min(1, { message: "الرجاء ادخال المدينة" }),
  codePostal: z
    .string()
    .optional(),
  streat: z.string().min(1, { message: "address is required" }),
});

export type TCreateAddressCredentials = z.infer<
  typeof CreateAddressCredentials
>;

export const resolver = zodResolver(CreateAddressCredentials);
