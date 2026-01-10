import { parseBmiArgs } from "./utils";

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = parseBmiArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}
