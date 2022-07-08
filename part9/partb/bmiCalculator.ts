interface Values {
    height: number;
    weight: number;
}

const checkValues = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const [height, weight] = args.slice(2);

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
        height: Number(height),
        weight: Number(weight),
    };
  } else {
    throw new Error('Provided target was not number!');
  }
};

export const bmiCalculator = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let bmiMessage = 'Underweight (thin)';
    if(bmi >= 18.5 && bmi < 25) {
        bmiMessage = 'Normal (healthy weight)';
    }
    if(bmi >= 25 && bmi < 30) {
        bmiMessage ='Overweight (pre-obesity)';
    }
    if(bmi >= 30) {
        bmiMessage = 'Obese (obesity)';
    }
    return bmiMessage;
};

try {
  const { height, weight } = checkValues(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// console.log(bmiCalculator(180, 74))
