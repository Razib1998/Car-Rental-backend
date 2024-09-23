import { z } from "zod";

const createBookingsValidationSchema = z.object({
  body: z.object({
    carId: z.string(),
    date: z.string(),
    startTime: z.string(),
  }),
});

export const BookingsValidation = {
  createBookingsValidationSchema,
};
