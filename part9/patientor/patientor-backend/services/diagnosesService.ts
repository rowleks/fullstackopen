import diagnoses from "../data/diagnoses";
import { type Diagnoses } from "../types/types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const getDiagnosesById = (code: string): Diagnoses | null => {
  const diagnosis = diagnoses.find((d) => d.code === code);
  return diagnosis || null;
};

export default { getDiagnoses, getDiagnosesById };
