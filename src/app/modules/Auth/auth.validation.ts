import z from "zod";

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Email is not correct form"),
    password: z.string(),
  }),
});

export const AuthValidation = {
  userLoginValidationSchema,
};
