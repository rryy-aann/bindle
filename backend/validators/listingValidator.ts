// backend/validators/listingValidator.ts
import { z } from "zod";

export const listingSchema = z.object({
  bookId: z
    .number({
      required_error: "Book ID is required",
      invalid_type_error: "Book ID must be a number",
    })
    .int()
    .positive("Book ID must be a positive integer"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a valid number",
    })
    .positive("Price must be greater than zero"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a valid number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be at least 1"),

  condition: z
    .string({
      required_error: "Condition is required",
      invalid_type_error: "Condition must be a string",
    })
    .min(2, "Condition must be at least 2 characters long")
    .max(50, "Condition must be at most 50 characters long")
    .trim(),

  sellerId: z
    .number({
      required_error: "Seller ID is required",
      invalid_type_error: "Seller ID must be a number",
    })
    .int()
    .positive("Seller ID must be a positive integer"),
});

