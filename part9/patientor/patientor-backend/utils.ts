import { Gender, HealthCheckRating, PatientEntry } from "./types/types";
import { z } from "zod";

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid discharge date format",
    }),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date format",
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date format",
      }),
    })
    .optional(),
});

const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const PatientEntrySchema: z.ZodType<PatientEntry> = z.object({
  name: z.string().min(3),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  ssn: z.string().min(7),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
  entries: z.array(EntrySchema),
});
