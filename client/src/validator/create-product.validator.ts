import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isNumber = (value: string) =>
  Number.isNaN(parseInt(value)) ? false : parseInt(value);

const CreateProductCredentials = z.object({
  name: z.string().min(1, { message: "المرجو ادخال الاسم" }),
  category: z.string().min(1, { message: "المرجو ادخال النوع" }),
  stock: z
    .string()
    .refine(isNumber, { message: "المرجو ادخال السعر بالاعداد" }),
  description: z.string().min(8, {
    message: "المرجو ادخال الوصف, يجب ان يكون اكثر من 8 حروف",
  }),
  subDescription: z.string().min(4, {
    message: "المرجو ادخال الوصف, يجب ان يكون اكثر من 4 حروف",
  }),
  price: z
    .string()
    .refine(isNumber, { message: "المرجو ادخال السعر بالاعداد" }),
  discountPercentage: z.string().optional(),
});

export type TCreateProductCredentials = z.infer<
  typeof CreateProductCredentials
>;

export const resolver = zodResolver(CreateProductCredentials);
