import { z } from "zod";

export const signInSchema = z.object({
  fullname: z.string().min(3, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export const logInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export const taskSchema = z.object({
  title: z.string().min(1,{
    message: "Title is required.",
  }),
  status: z.string().min(1,{
    message: "Status is required.",
  }),
  description: z.string().optional(),
  deadline: z.date().optional(),
  priority: z.string().optional(),
});


