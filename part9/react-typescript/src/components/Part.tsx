import React from 'react'
import { CoursePart } from "../types";

type Props = {
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: Props) => {
    switch(props.coursePart.type) {
        case "normal":
            return (
                <div>
                    <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
                    <p>{props.coursePart.description}</p>
                </div>
            );
        case "submission":
            return (
                <div>
                    <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
                    <p>{props.coursePart.description}</p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
                </div>
            );
        case "special":
            return (
                <div>
                    <h3>{props.coursePart.name} {props.coursePart.exerciseCount}</h3>
                    <p>{props.coursePart.description}</p>
                    <p>required skills: {props.coursePart.requirements.map(skill => `${skill},`)}</p>
                </div>
            );
        default:
            return assertNever(props.coursePart);
    }
}

export default Part