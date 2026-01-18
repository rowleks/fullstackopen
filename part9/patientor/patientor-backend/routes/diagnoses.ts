import express from "express";
import type { Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnoses } from "../types/types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get("/:code", (req, res: Response<Diagnoses | { error: string }>) => {
  const code = req.params.code;
  const diagnosis = diagnosesService.getDiagnosesById(code);
  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.status(404).send({ error: "Diagnosis not found" });
  }
});

export default router;
