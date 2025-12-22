import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(2).max(3),
    email: z.email(),
    password: z.string().min(3).max(3),
    
})