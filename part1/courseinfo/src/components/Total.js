import React from 'react'

const Total = ({parts}) => {
    let sum = 0
    parts.map(part => sum += part.exercises)
    return (
        <div>
            <p>Number of exercises {sum}</p>
        </div>
    )
}

export default Total
