import patients from "../data/patients";
import type {
  NewEntry,
  NSPatient,
  Patient,
  PatientEntry,
} from "../types/types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNSPatients = (): NSPatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: PatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry,
    entries: entry.entries.map((e) => ({ ...e, id: uuid() })),
  };

  patients.push(newEntry);

  return newEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const updatedPatient = {
    ...patient,
    entries: [...patient.entries, newEntry],
  };

  patients[patients.indexOf(patient)] = updatedPatient;
  return updatedPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  getNSPatients,
  addPatient,
  getPatientById,
  addEntry,
};
