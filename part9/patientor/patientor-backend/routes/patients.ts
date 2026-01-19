import express from "express";
import type { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import type {
  NewEntry,
  NSPatient,
  Patient,
  PatientEntry,
} from "../types/types";
import { NewEntrySchema, PatientEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

// Middlewares

const parseNewPatientBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    PatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const parseNewEntryBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    res.status(500).send({ error: "Internal server error" });
  }
};

//Routes

router.get("/", (_req, res: Response<NSPatient[]>) => {
  res.send(patientService.getNSPatients());
});

router.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Patient | { error: string }>
  ) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  }
);

router.post(
  "/",
  parseNewPatientBody,
  (req: Request<unknown, unknown, PatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  parseNewEntryBody,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const updatedPatient = patientService.addEntry(req.params.id, req.body);
    res.json(updatedPatient);
  }
);

router.use(errorMiddleware);

export default router;
