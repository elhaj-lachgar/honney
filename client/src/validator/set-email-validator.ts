import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const setEmailCredentials = z.object({
    email : z.string().email({message:"البريد الالكتروني غير صالح"}),
});


export type TSetEmailCredentials = z.infer<typeof setEmailCredentials>;

export const resolver = zodResolver(setEmailCredentials);