import { v1 as uuid } from 'uuid';
import { NewPatientEntry, Gender, Entry, BaseEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const parseString = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error('Incorrect or missing string: ' + text);
    }
    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    const ratingValue: number = parseInt(rating);
    if(!isHealthCheckRating(ratingValue)) {
        throw new Error('Incorrect health check rating: ' + rating);
    }
    return ratingValue;
};

const parseArrayString = (array: unknown): string[] => {
    if(!array || !Array.isArray(array)) {
        throw new Error('Incorrect or missing array: ' + array);
    }
    return array.map(parseString);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatientEntry: NewPatientEntry = { 
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
     };
    return newPatientEntry;
};

const toNewEntry = (object: any): Entry => {
    const baseEntry: BaseEntry = {
        id: uuid(),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayString(object.diagnosisCodes)
    }
    switch(object.type) {
        case 'HealthCheck':
            return {
                ...baseEntry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case 'OccupationalHealthcare':
            let sickLeave: { startDate: string, endDate: string } | undefined;
            if(object.sickLeave) {
                sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                };
            }
            return {
                ...baseEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName),
                sickLeave
            };
        case 'Hospital':
            return {
                ...baseEntry,
                type: 'Hospital',
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                }
            };
        default:
            throw new Error('Incorrect or missing entry type: ' + object.type);
    }
}

export default {
    toNewPatientEntry, 
    toNewEntry
};