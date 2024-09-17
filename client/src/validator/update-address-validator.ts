import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateAddressCredentials = z.object({
    codePostal : z.string().optional(),
    city : z.string().optional(),
    streat : z.string().optional(),
    phone : z.string().optional(),
});


export type TUpdateAddressCredentials = z.infer< typeof UpdateAddressCredentials>;

export const resolver = zodResolver(UpdateAddressCredentials);