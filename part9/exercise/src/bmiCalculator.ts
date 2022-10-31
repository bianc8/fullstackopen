/**
 * Calculate bmi given height and weight
 * @param height in cm
 * @param weight in kg
 * @returns 
 */
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  else if (bmi < 25) {
    return 'Normal';
  }
  else if (bmi < 30) {
    return 'Overweight';
  }
  else {
    return 'Obese';
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));