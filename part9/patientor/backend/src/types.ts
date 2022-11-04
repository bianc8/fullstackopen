export interface Diagnoses {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosesCodes?: Array<Diagnoses['code']>,
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  };
}
export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string,
    criteria: string
  };
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

// ---------------------------------------------------------------------------------------------
// By: Andrii Dieiev
// From: https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;