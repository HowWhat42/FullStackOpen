import { useState } from "react";
import { Grid, Button, RadioGroup, FormControlLabel, FormLabel, Radio } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, TypeOption, SelectField } from "../components/FormField";
import { BaseEntry, Entry, HealthCheckRating } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;
type BaseEntryFormValues = Omit<BaseEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckRating: TypeOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const [type, setType] = useState<string>("HealthCheck");
    
    const initialValues: BaseEntryFormValues = {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: []
    }; 
    const [formValues, setFormValues] = useState<EntryFormValues>({ ...initialValues, type: "HealthCheck", healthCheckRating: HealthCheckRating.Healthy });

    const getFormValues = (type: string) => {
        switch (type) {
            case "Hospital":
                setFormValues({ ...initialValues, type: "Hospital", discharge: { date: "", criteria: "" } });
                break;            
            case "OccupationalHealthcare":
                setFormValues({ ...initialValues, type: "OccupationalHealthcare", employerName: "" });
                break;
            default:
                setFormValues({ ...initialValues, type: "HealthCheck", healthCheckRating: HealthCheckRating.Healthy });
                break;
        }
    };

    const handleTypeChange = (type: string) => {
        setType(type);
        getFormValues(type);
    };

    return (
        <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validate={(values) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
            errors.description = requiredError;
            }
            if (!values.date) {
            errors.date = requiredError;
            }
            if (!values.specialist) {
            errors.specialist = requiredError;
            }
            if (values.type === "Hospital" && !values.discharge.date) {
            errors.date = requiredError;
            }
            if (values.type === "Hospital" && !values.discharge.criteria) {
            errors.criteria = requiredError;
            }
            if (values.type === "OccupationalHealthcare" && !values.employerName) {
            errors.employerName = requiredError;
            }
            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
            <Form className="form ui">
                <FormLabel id="demo-radio-buttons-group-label">Entry Type</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="HealthCheck"
                    name="radio-buttons-group"
                    row
                    value={type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                >
                    <FormControlLabel value="HealthCheck" control={<Radio />} label="HealthCheck" />
                    <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                    <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="OccupationalHealthcare" />
                </RadioGroup>
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnoses)}
                />
                {type === "HealthCheck" && (
                    <SelectField label="HealthCheckRating" name="healthCheckRating" options={healthCheckRating} />
                )}
                {type === "Hospital" && (
                    <>
                        <FormLabel id="demo-radio-buttons-group-label">Discharge</FormLabel>
                        <Field
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        name="date"
                        component={TextField}
                        />
                        <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="criteria"
                        component={TextField}
                        />
                    </>
                )}
                {type === "OccupationalHealthcare" && (
                    <>
                        <Field
                        label="Employer Name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                        />
                        <FormLabel id="demo-radio-buttons-group-label">Sick Leave</FormLabel>
                        <Field
                        label="Start Date"
                        placeholder="Start Date"
                        name="startDate"
                        component={TextField}
                        />
                        <Field
                        label="End Date"
                        placeholder="End Date"
                        name="endDate"
                        component={TextField}
                        />
                    </>
                )}
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
        }}
        </Formik>
    );
};

export default AddEntryForm;
