import React from 'react';
import { Typography, Card } from '@material-ui/core';
import { HospitalEntry } from '../types';
import { useStateValue } from "../state";
import { HealthAndSafety } from '@mui/icons-material';

type Props = {
    entry: HospitalEntry
};

const Hospital = ({entry}: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Card variant="outlined">
            <Typography>{entry.date} <HealthAndSafety /></Typography>
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

export default Hospital;