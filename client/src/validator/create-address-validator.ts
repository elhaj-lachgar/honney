import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAddressCredentials = z.object({
  email: z.string().email({ message: "البريد ليس صالحا" }),
  phone: z.string().length(9, { message: "please enter a phone ex.624568920" }),
  city: z.string().min(1,{message:'please select a city'}),
  codePostal: z.string().optional(),
  name : z.string().min(1,{message:'please enter a name'})
});

export type TCreateAddressCredentials = z.infer<typeof CreateAddressCredentials>;

export const resolver = zodResolver(CreateAddressCredentials);