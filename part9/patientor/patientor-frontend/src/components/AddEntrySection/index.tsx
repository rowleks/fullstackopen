import { useState, SyntheticEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { HealthCheckRating, Patient, NewEntry } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";

interface Props {
  patientId: string;
  onEntryAdded: (patient: Patient) => void;
}

const AddEntrySection = ({ patientId, onEntryAdded }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [error, setError] = useState<string>("");

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (Object.values(HealthCheckRating).includes(value as HealthCheckRating)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  const resetForm = () => {
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setDescription("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setError("");
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const diagnosisCodesArray = diagnosisCodes
        ? diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter((code) => code.length > 0)
        : undefined;

      const newEntry: NewEntry = {
        type: "HealthCheck",
        date,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        description,
        healthCheckRating,
      };

      const updatedPatient = await patientService.addEntry(patientId, newEntry);
      onEntryAdded(updatedPatient);
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <AddEntryForm
      date={date}
      setDate={setDate}
      specialist={specialist}
      setSpecialist={setSpecialist}
      diagnosisCodes={diagnosisCodes}
      setDiagnosisCodes={setDiagnosisCodes}
      description={description}
      setDescription={setDescription}
      healthCheckRating={healthCheckRating}
      setHealthCheckRating={setHealthCheckRating}
      onHealthCheckRatingChange={onHealthCheckRatingChange}
      onSubmit={addEntry}
      error={error}
      onCancel={resetForm}
    />
  );
};

export default AddEntrySection;
