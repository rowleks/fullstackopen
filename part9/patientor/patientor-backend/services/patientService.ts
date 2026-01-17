import patients from "../data/patients";
import type { NSPatient, Patient, PatientEntry } from "../types/types";
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

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  getNSPatients,
  addPatient,
  getPatientById,
};
