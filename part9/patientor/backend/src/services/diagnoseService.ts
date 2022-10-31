import diagnoses from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return diagnoses;
};

const addDiary = () => {
  return [];
};

export default {
  getEntries,
  addDiary
};