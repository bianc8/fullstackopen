
type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/**
 * Calculate Exercise given daily exercise hours and target
 * @param exerciseHours 
 * @param target 
 * @returns 
 */
const calculateExercise = (exerciseHours: Array<number>, target: number): Result => {
  const totalHours = exerciseHours.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / exerciseHours.length;
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(hours => hours > 0).length,
    success: average >= target,
    rating: Math.round(average) < target ? 1 : Math.round(average) === target ? 2 : 3,
    ratingDescription: Math.round(average) < target ? 'You should do more exercise' : Math.round(average) === target ? 'not too bad but could be better' : 'You did more exercise than needed',
    target: target,
    average: average
  }
};

//const target = Number(process.argv[2]);
//const exerciseHours = process.argv.slice(3).map(hours => Number(hours));
//console.log(calculateExercise(exerciseHours, target));

export { calculateExercise };