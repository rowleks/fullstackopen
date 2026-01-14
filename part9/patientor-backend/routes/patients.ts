import express from "express";
import type { Response } from "express";
import patientService from "../services/patientService";
import type { NSPatient } from "../types/types";

const router = express.Router();

router.get("/", (_req, res: Response<NSPatient[]>) => {
  res.send(patientService.getNSPatients());
});

export default router;
