import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Alert,
} from "@mui/material";

import { HealthCheckRating } from "../../types";

interface Props {
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
  onSubmit: (event: React.SyntheticEvent) => void;
  error: string;
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
  onSubmit,
  error,
  onCancel,
}: Props) => {
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form
        onSubmit={onSubmit}
        style={{ border: "1px dotted", padding: "2rem" }}
      >
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
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: 16 }}
          required
        />
        <TextField
          label="Diagnosis Codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
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
