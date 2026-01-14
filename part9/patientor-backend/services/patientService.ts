import patients from "../data/patients";
import type { NSPatient, Patient } from "../types/types";


const getPatients = (): Patient[] => {
  return patients;
};

const getNSPatients = (): NSPatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getPatients,
  getNSPatients,
};
