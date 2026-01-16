import express from "express";
import type { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import type { NSPatient, Patient, PatientEntry } from "../types/types";
import { PatientEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

// Middlewares

const parseResBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    PatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

//Routes

router.get("/", (_req, res: Response<NSPatient[]>) => {
  res.send(patientService.getNSPatients());
});

router.post(
  "/",
  parseResBody,
  (req: Request<unknown, unknown, PatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
