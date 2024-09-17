import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim(),
    email: z.string().email("Email is not correct form"),
    role: z.enum(["admin", "user"]),
    phone: z.string(),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
