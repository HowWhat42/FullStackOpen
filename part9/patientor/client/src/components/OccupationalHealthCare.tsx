import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";
import { Work } from '@mui/icons-material';

type Props = {
    entry: OccupationalHealthcareEntry
};

const OccupationalHealthCare = ({entry}: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Card variant="outlined">
            <Typography>{entry.date}<Work /><i>{entry.employerName}</i></Typography>
            <Typography><i>{entry.description}</i></Typography>
            <ul>
                {entry?.diagnosisCodes?.map(code => (
                    <li key={code}><Typography>{code} {diagnoses[code]?.name}</Typography></li>
                ))}
            </ul>
            <Typography>diagnose by {entry.specialist}</Typography>
        </Card>
    );
};

export default OccupationalHealthCare;