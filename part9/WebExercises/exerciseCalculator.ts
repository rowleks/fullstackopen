import { parseExerciseArgs } from "./utils";

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  excerciseHours: number[]
): Results => {
  const periodLength = excerciseHours.length;
  const trainingDays = excerciseHours.filter((e) => e > 0).length;
  const average =
    excerciseHours.reduce((acc, curr) => acc + curr, 0) / excerciseHours.length;
  const success = average >= target;
  const rating = average >= target ? 3 : average >= target * 0.75 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great, you reached your target"
      : rating === 2
      ? "Not too bad but could be better"
      : "You need to work harder";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error) {
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}
