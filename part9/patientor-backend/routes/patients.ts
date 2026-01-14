import express from "express";
import type { Response } from "express";
import patientService from "../services/patientService";
import type { NSPatient } from "../types/types";
import { validateEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NSPatient[]>) => {
  res.send(patientService.getNSPatients());
});

router.post("/", (req, res) => {
  const newPatient = validateEntry(req.body);

  try {
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
