import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const ReviewCredentials = z.object({
    content : z.string().min(1,{message:"content is required"}),
});

export type TReviewCredentials = z.infer<typeof ReviewCredentials>;

export const resolver = zodResolver(ReviewCredentials);