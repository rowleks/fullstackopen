export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NSPatient = Omit<Patient, "ssn">;

export type PatientEntry = Omit<Patient, "id">;
