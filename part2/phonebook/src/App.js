import { useState } from 'react'
import {Filter, PersonForm, Persons} from './components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState(persons)
  const [search, setSearch] = useState('')

  const addPerson = (evt) => {
    evt.preventDefault()
    if(persons.find(person => person.name === newName)) return alert(`${newName} is already added to phonebook`)
    const newPerson = {
        name: newName,
        number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setShowPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleName = (evt) => setNewName(evt.target.value)
  const handleNumber = (evt) => setNewNumber(evt.target.value)

  const onSearch = (evt) => {
    setSearch(evt.target.value)
    if(!evt.target.value) return setShowPersons(persons)
    const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(evt.target.value.toLowerCase()))
    if(filteredPerson.length) {
        setShowPersons(filteredPerson)
    } else {
        setShowPersons(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onSearch={onSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons showPersons={showPersons} />
    </div>
  )
}

export default App