import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};

const addDiary = () => {
  return [];
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
};