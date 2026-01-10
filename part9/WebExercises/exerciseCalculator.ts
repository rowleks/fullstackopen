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
  excerciseHours: number[],
  target: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
