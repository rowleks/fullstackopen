import { Box, Typography } from "@mui/material";
import { Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useEffect, useState } from "react";
import patients from "../services/patients";
import axios from "axios";

type PatientInfoProps = {
  patientId: string | null | undefined;
};

const PatientInfo = ({ patientId }: PatientInfoProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!patientId) return;
    patients
      .getById(patientId)
      .then((data: Patient) => {
        setPatient(data);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError<{ error: string }>(err)) {
          setError(err.response?.data?.error || err.message);
          setPatient(null);
        }
      });
  }, [patientId]);

  if (!patient) {
    return (
      <Typography variant="h6" sx={{ marginBlock: "2rem", color: "red" }}>
        {error || "Unable to fetch patient data"}
      </Typography>
    );
  }

  const { name, gender, ssn, occupation } = patient;
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <Typography variant="h4" sx={{ marginBlock: "2rem" }}>
          {name}
        </Typography>

        {gender === "male" ? (
          <MaleIcon fontSize="large" />
        ) : gender === "female" ? (
          <FemaleIcon fontSize="large" />
        ) : (
          <TransgenderIcon fontSize="large" />
        )}
      </Box>
      <Typography>ssn: {ssn}</Typography>
      <Typography>occupation: {occupation}</Typography>
    </>
  );
};

export default PatientInfo;
