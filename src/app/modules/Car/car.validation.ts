import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    isElectric: z.boolean(),
    features: z
      .array(z.string())
      .nonempty({ message: "Features must have at least one item" }),
    pricePerHour: z
      .number()
      .min(0, { message: "Price per hour must be a positive number" }),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
};
