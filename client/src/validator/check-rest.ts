import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const checkRestCodeCredentials = z.object({
    restCode : z.string().min(6,{message:"رمز اعادة التعيين ليس صالحا"})
});

export type TCheckRestCodeCredentials = z.infer<typeof checkRestCodeCredentials>;


export const resolver = zodResolver(checkRestCodeCredentials)