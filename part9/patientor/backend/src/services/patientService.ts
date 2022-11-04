/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PublicPatient, NewPatient } from '../types';

const getEntries = (): Array<Patient> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return patients;
};

const getNonSensitiveEntries = (): Array<PublicPatient> => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
    entries: p.entries,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (entry: any, id: string): Patient | undefined => {
  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry,
  };
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    patient.entries.push(newEntry);
    return patient;
  }
  return undefined;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};