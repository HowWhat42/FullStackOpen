interface ExercisesValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InputValues {
    target: number;
    dailyExercises: number[];
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [target, ...dailyExercises] = args.slice(2);

  if (!isNaN(Number(args[2]))) {
    return {
        dailyExercises: [...dailyExercises.map(day => {
            if(isNaN(Number(day))) throw new Error('Provided values were not numbers!');
            return Number(day);
        })],
        target: Number(target),
    };
  } else {
    throw new Error('Provided target was not number!');
  }
};

export const calculateExercises = (dailyExercises: number[], target: number): ExercisesValues => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(day => day > 0).length;
    const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
    const rating = average >= target ? 3 : average >= target * 0.8 ? 2 : 1;
    const success = average >= target;
    const ratingDescription = rating === 1 ? "bad" : rating === 2 ? "not too bad but could be better" : "excellent";
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
  const { dailyExercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));