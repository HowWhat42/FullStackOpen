import React from 'react'

interface CoursePart {
    name: string;
    exerciseCount: number;
}

type Props = {
    courseParts: Array<CoursePart>
}

const Total = (props: Props) => {
  return (
    <div>
        <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total