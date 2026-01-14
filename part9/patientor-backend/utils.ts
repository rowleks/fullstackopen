import { Gender, PatientEntry } from "./types/types";

//Type guards

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(text);
};

const isValidEntry = (entryObj: object): entryObj is PatientEntry => {
  const validKeys = ["name", "dateOfBirth", "ssn", "gender", "occupation"];

  return validKeys.every((k) => k in entryObj);
};

//Parsers

const parseString = (entry: unknown): string => {
  if (!isString(entry)) {
    throw new Error("Invalid entry type: " + entry);
  }

  return entry;
};

const parseGender = (entry: unknown): Gender => {
  if (!isString(entry) || !isGender(entry)) {
    throw new Error("Invalid gender: " + entry);
  }

  return entry;
};

const parseDate = (entry: unknown): string => {
  if (!isString(entry) || !isDate(entry)) {
    throw new Error("Invalid date: " + entry);
  }
  return entry;
};

const parseEntryObj = (entryObj: unknown): PatientEntry => {
  if (!entryObj || typeof entryObj !== "object") {
    throw new Error("Incorrect or missing data type");
  }

  if (!isValidEntry(entryObj)) {
    throw new Error("Incorrect data: some fields are missing");
  }

  return entryObj;
};

export const validateEntry = (entryObj: unknown): PatientEntry => {
  const validEntry = parseEntryObj(entryObj);

  return {
    name: parseString(validEntry.name),
    dateOfBirth: parseDate(validEntry.dateOfBirth),
    ssn: parseString(validEntry.ssn),
    gender: parseGender(validEntry.gender),
    occupation: parseString(validEntry.occupation),
  };
};
