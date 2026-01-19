// Patient and Entry Types
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = UnionOmit<Entry, "id">;

interface PatientBase {
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
}

export interface Patient extends PatientBase {
  id: string;
  entries: Entry[];
}

export interface PatientFormValues extends PatientBase {
  entries: Array<UnionOmit<Entry, "id">>;
}

// Diagnosis Types
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
