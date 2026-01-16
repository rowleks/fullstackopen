import { z } from "zod";
import { PatientEntrySchema } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PatientEntry = z.infer<typeof PatientEntrySchema>;

export type Patient = PatientEntry & { id: string };

export type NSPatient = Omit<Patient, "ssn">;
