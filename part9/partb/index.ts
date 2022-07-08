import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).send('malformatted parameters');
        return;
    }
    const bmi = bmiCalculator(Number(weight), Number(weight));
    res.status(200).send({ weight: Number(weight), height: Number(height), bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!target || !daily_exercises) {
        res.status(400).send('parameters missing');
        return;
    }

    if (isNaN(Number(target))) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.status(200).send(result);
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});