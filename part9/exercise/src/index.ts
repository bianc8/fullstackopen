import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    res.send({ weight, height, bmi: calculateBmi(height, weight) });    
  }
});

app.post('/exercises', (req, res) => {
  const target = req.body.target;
  let daily_exercises = req.body.daily_exercises;
  let valid = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daily_exercises.forEach((hours: any) => {
    if (isNaN(hours)) {
      valid = false;
    }
  });

  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters missing' });
  } if (isNaN(Number(target)) || !valid) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  else { 
    daily_exercises = daily_exercises.map((hours: number) => Number(hours));
    res.send(calculateExercise(daily_exercises, Number(target)))
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});