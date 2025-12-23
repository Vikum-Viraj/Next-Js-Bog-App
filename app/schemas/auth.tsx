import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
    role: z.enum(["admin", "user"], {
        errorMap: () => ({ message: "Please select a role" }),
    }),
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})