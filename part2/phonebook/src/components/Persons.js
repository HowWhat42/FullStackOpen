import React from 'react'

const Persons = ({showPersons, click}) => {
  return showPersons.map((person) => (<div key={person.name}>
    <p>{person.name} {person.number}</p>
    <button onClick={() => click(person)}>Delete</button>
  </div>))
}

export default Persons