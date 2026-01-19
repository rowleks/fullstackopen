import { useState, SyntheticEvent, useEffect } from "react";
import { Alert, Box, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating, Patient, NewEntry } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";

interface Props {
  patientId: string;
  onEntryAdded: (patient: Patient) => void;
}

const AddEntrySection = ({ patientId, onEntryAdded }: Props) => {
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(
      event.target.value as
        | "HealthCheck"
        | "Hospital"
        | "OccupationalHealthcare"
    );
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (Object.values(HealthCheckRating).includes(value as HealthCheckRating)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  const resetForm = () => {
    setEntryType("HealthCheck");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setDescription("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setError("");
    setSuccess("");
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

      let newEntry: NewEntry;
      if (entryType === "HealthCheck") {
        newEntry = {
          type: "HealthCheck",
          date,
          specialist,
          diagnosisCodes: diagnosisCodesArray,
          description,
          healthCheckRating,
        };
      } else if (entryType === "Hospital") {
        newEntry = {
          type: "Hospital",
          date,
          specialist,
          diagnosisCodes: diagnosisCodesArray,
          description,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      } else {
        newEntry = {
          type: "OccupationalHealthcare",
          date,
          specialist,
          diagnosisCodes: diagnosisCodesArray,
          description,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
        };
      }

      const updatedPatient = await patientService.addEntry(patientId, newEntry);
      onEntryAdded(updatedPatient);
      setSuccess("Entry added successfully");
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <>
      <Box sx={{ marginBlock: "2rem" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Box>

      <AddEntryForm
        entryType={entryType}
        onEntryTypeChange={onEntryTypeChange}
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
        dischargeDate={dischargeDate}
        setDischargeDate={setDischargeDate}
        dischargeCriteria={dischargeCriteria}
        setDischargeCriteria={setDischargeCriteria}
        employerName={employerName}
        setEmployerName={setEmployerName}
        sickLeaveStartDate={sickLeaveStartDate}
        setSickLeaveStartDate={setSickLeaveStartDate}
        sickLeaveEndDate={sickLeaveEndDate}
        setSickLeaveEndDate={setSickLeaveEndDate}
        onSubmit={addEntry}
        onCancel={resetForm}
      />
    </>
  );
};

export default AddEntrySection;
