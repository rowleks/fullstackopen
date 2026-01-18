import { useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";

import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfoPage";

const App = () => {
  const match = useMatch("/patients/:id");

  const matchedPatient = match ? match.params.id : null;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage />} />

          <Route
            path="/patients/:id"
            element={<PatientInfo patientId={matchedPatient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
