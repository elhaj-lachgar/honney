import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const AuthCredentials = z.object({
    password : z.string().min(6,"كلمة المرور قصيرة").max(12,"كلمة المرور طويلة"),
    email : z.string().email({message:'البريد ليس صالحا'}),
});

export type TAuthCredentials = z.infer<typeof AuthCredentials>;

export const resolver = zodResolver(AuthCredentials);