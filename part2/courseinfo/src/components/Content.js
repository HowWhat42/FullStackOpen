import React from 'react'
import { Part } from '../components'

const Content = ({parts}) => {
    
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}  />)}
        </div>
    )
}

export default Content
