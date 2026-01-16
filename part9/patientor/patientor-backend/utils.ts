import { Gender, PatientEntry } from "./types/types";
import { z } from "zod";

export const PatientEntrySchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  ssn: z.string().min(7),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});

export const validateEntry = (entryObj: unknown): PatientEntry => {
  return PatientEntrySchema.parse(entryObj);
};
