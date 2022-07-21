import React from 'react';
import { Typography, Card } from '@material-ui/core';
import { HealthCheckEntry } from '../types';
import { useStateValue } from "../state";
import { MedicalServices, Favorite } from '@mui/icons-material';

type Props = {
    entry: HealthCheckEntry
};

const HealthCheck = ({ entry }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const healthCheckRatingColor = (healthCheckRating: number): string => {
        switch (healthCheckRating) {
            case 0:
                return '#008000';
            case 1:
                return '#FFFF00';
            case 2:
                return '#FFA500';
            case 3:
                return '#FF0000';
            default:
                return '#000000';
        }
    };

    return (
        <Card variant="outlined">
            <Typography>{entry.date} <MedicalServices /></Typography>
            <Typography><i>{entry.description}</i></Typography>
            <ul>
                {entry?.diagnosisCodes?.map(code => (
                    <li key={code}><Typography>{code} {diagnoses[code]?.name}</Typography></li>
                ))}
            </ul>
            <Favorite sx={{color: healthCheckRatingColor(entry.healthCheckRating)}} />
            <Typography>diagnose by {entry.specialist}</Typography>
        </Card>
    );
};

export default HealthCheck;