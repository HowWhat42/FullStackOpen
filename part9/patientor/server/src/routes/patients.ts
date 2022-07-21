import express from 'express';
import patientService from '../services/patientService';
import entries from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = entries.toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += `Error: ${error.message}`;
            res.status(400).send(errorMessage);
        }
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = entries.toNewEntry(req.body);
        res.send(patientService.addEntry(req.params.id, newEntry));
    } catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += `Error: ${error.message}`;
            res.status(400).send(errorMessage);
        }
    }
});

export default router;
