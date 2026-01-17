import diagnoses from "../data/diagnoses";
import { type Diagnoses } from "../types/types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

export default { getDiagnoses };
