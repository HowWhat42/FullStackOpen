import React from 'react'
import Part from './Part';
import { CoursePart } from "../types";

type Props = {
    courseParts: CoursePart[]
}

const Content = (props: Props) => {
  return (
    <>
        {props.courseParts.map(part => <Part key={part.name} coursePart={part} />)}
    </>
  )
}

export default Content