interface BmiArgsResult {
  height: number;
  weight: number;
}

interface ExerciseArgsResult {
  target: number;
  hours: number[];
}

export const parseBmiArgs = (args: string[]): BmiArgsResult => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

export const parseExerciseArgs = (args: string[]): ExerciseArgsResult => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const hours = args.slice(3).map((h) => Number(h));

  if (isNaN(target) || hours.some((h) => isNaN(h))) {
    throw new Error("Provided values were not numbers!");
  }

  return { target, hours };
};
