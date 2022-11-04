/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NewPatient, Gender, NewEntry, HealthCheckRating, EntryType, Diagnoses } from './types';
import { diagnosesCodes } from '../data/diagnoses';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender|| !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};


type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

export const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    entries: []
  };
  return newEntry;
};

// -----------------------------

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};
const isDiagnosesCode = (code: unknown): code is Diagnoses['code'] => {
  return Object.values(diagnosesCodes).includes(String(code));
};
const parseDiagnosesCodes = (diagnosesCodeEntry: unknown): Array<Diagnoses['code']> => {
  if (!diagnosesCodeEntry || !Array.isArray(diagnosesCodeEntry)) {
    throw new Error('Incorrect or missing diagnosesCodes');
  }
  diagnosesCodeEntry.forEach((code) => {
    if (!isString(code) || !isDiagnosesCode(code)) {
      throw new Error('Incorrect diagnosesCodes');
    }
  });
  return diagnosesCodeEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};
const parseType = (type: unknown): EntryType => {
  if (!type|| !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing EntryType: ' + type);
  }
  return type;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return healthCheckRating;
};
const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }
  return employerName;
};
const isSickLeave = (param: unknown): param is { startDate: string, endDate: string } => {
  return (
    typeof param === 'object' &&
    param !== null &&
    isString((param as { startDate: string }).startDate) &&
    isString((param as { endDate: string }).endDate) &&
    isDate((param as { startDate: string }).startDate) &&
    isDate((param as { endDate: string }).endDate) && 
    Date.parse((param as { startDate: string }).startDate) < Date.parse((param as { endDate: string}).endDate)
  );
};
const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave;
};
const isDischarge = (param: unknown): param is { date: string, criteria: string } => {
  return (
    typeof param === 'object' &&
    param !== null &&
    isString((param as { date: string }).date) &&
    isString((param as { criteria: string }).criteria) &&
    isDate((param as { date: string }).date)
  );
};
const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

type NewEntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosesCodes: unknown, type: unknown, healthCheckRating?: unknown, discharge?: unknown, employerName?: unknown, sickLeave?: unknown };

export const toNewEntry = ({ description, date, specialist, diagnosesCodes, type, healthCheckRating, discharge, employerName, sickLeave } : NewEntryFields): NewEntry => {
  let newEntry: NewEntry;
  type = parseType(type);
  switch (type) {
    case EntryType.HealthCheck:
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosesCodes: parseDiagnosesCodes(diagnosesCodes),
        type: type,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      break;
    case EntryType.OccupationalHealthcare:
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosesCodes: parseDiagnosesCodes(diagnosesCodes),
        type: type,
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };
      break;
    case EntryType.Hospital:
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosesCodes: parseDiagnosesCodes(diagnosesCodes),
        type: type,
        discharge: parseDischarge(discharge),
      };
      break;
    default:
      throw new Error('Incorrect or missing EntryType');
  }
  return newEntry;
};