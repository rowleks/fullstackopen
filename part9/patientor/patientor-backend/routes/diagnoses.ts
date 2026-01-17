import express from "express";
import type { Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnoses } from "../types/types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
