import diaries from '../../data/diaries';
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};