import diagnoses from '../../data/diagnoses';
import { Diagnoses } from '../types';

const getEntries = (): Array<Diagnoses> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

const addDiary = () => {
  return [];
};

export default {
  getEntries,
  addDiary
};