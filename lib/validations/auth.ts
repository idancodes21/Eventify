import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;