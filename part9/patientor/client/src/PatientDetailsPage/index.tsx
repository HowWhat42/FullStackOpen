import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { Male, Female } from "@mui/icons-material";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import HealthCheck from "../components/HealthCheck";
import Hospital from "../components/Hospital";
import OccupationalHealthCare from "../components/OccupationalHealthCare";
import AddEntryForm from "../AddEntryModal";
import { useStateValue } from "../state";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage = () => {
    const [, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | undefined>();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                if(id) {
                    const { data: patientData } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    setPatient(patientData);
                }
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientDetails();
    }, [id]);

    const genderIcon = (gender: Gender) => {
        switch (gender) {
            case 'male':
                return <Male />;

            case 'female':
                return <Female />;

            default:
                return null;
        }
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const getEntry = (entry: Entry) => {
        switch(entry.type) {
            case "HealthCheck":
                return <HealthCheck key={entry.id} entry={entry} />;
            case "Hospital":
                return <Hospital key={entry.id} entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthCare key={entry.id} entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if(id && patient) {
                const { data: newEntry } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                dispatch({ type: "ADD_ENTRY", payload: newEntry, patientId: id });
                setPatient({ ...patient, entries: [...patient.entries, newEntry] });
                closeModal();
            }
        } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
            console.error("Unknown error", e);
            setError("Unknown error");
        }
        }
    };

    return (
        <>
            {patient && (
                <div className="App">
                    <Box>
                        <Typography variant="h4">
                        {patient.name} {genderIcon(patient.gender)}
                        </Typography>
                        <Typography>
                        ssn: {patient.ssn}
                        </Typography>
                        <Typography>
                        occupation: {patient.occupation}
                        </Typography>
                        <Typography variant="h4">
                        entries
                        </Typography>
                        {patient.entries.map(entry => getEntry(entry))}
                    </Box>
                    <AddEntryForm
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        Add New Entry
                    </Button>
                </div>
                )
            }
        </>
    );
};

export default PatientDetailsPage;
