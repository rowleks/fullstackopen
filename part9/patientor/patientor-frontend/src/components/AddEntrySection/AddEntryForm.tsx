import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { HealthCheckRating } from "../../types";
import { titleCase } from "title-case";

interface Props {
  entryType: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
  onEntryTypeChange: (event: SelectChangeEvent<string>) => void;
  date: string;
  setDate: (date: string) => void;
  specialist: string;
  setSpecialist: (specialist: string) => void;
  diagnosisCodes: string;
  setDiagnosisCodes: (codes: string) => void;
  description: string;
  setDescription: (description: string) => void;
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (rating: HealthCheckRating) => void;
  onHealthCheckRatingChange: (event: SelectChangeEvent<string>) => void;
  dischargeDate: string;
  setDischargeDate: (date: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (criteria: string) => void;
  employerName: string;
  setEmployerName: (name: string) => void;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: (date: string) => void;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: (date: string) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  onCancel: () => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const AddEntryForm = ({
  entryType,
  onEntryTypeChange,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  description,
  setDescription,
  healthCheckRating,
  onHealthCheckRatingChange,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          border: "1px dotted",
          padding: "2rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        <InputLabel style={{ marginTop: 20, marginBottom: 8 }}>
          Entry Type
        </InputLabel>
        <Select
          label="Entry Type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
          style={{ marginBottom: 16 }}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>

        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: 16 }}
          required
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(titleCase(target.value))}
          style={{ marginBottom: 16 }}
          required
        />
        <TextField
          label="Diagnosis Codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(target.value.toUpperCase())
          }
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: 16 }}
          required
        />

        {entryType === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20, marginBottom: 8 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
              style={{ marginBottom: 16 }}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 16 }}
              required
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginBottom: 16 }}
              required
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              style={{ marginBottom: 16 }}
              required
            />
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 16 }}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 16 }}
            />
          </>
        )}

        <Grid container spacing={2}>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
