import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry, NewEntry, Entry } from '../types';

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
    const patient = patients.find(p => p.id === id);
    const newEntry = {
        id: uuid(),
        ...entry,
    }
    if (patient) {
        patient.entries.push(newEntry);
    }
    return newEntry;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};