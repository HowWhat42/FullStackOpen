import { useState, useEffect } from 'react'
import {Filter, Notification, PersonForm, Persons} from './components'
import { create, deleteOne, getAll, update } from './services/PersonService'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  useEffect(() => {
    getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShowPersons(initialPersons)
      })
  }, [])

  const addPerson = (evt) => {
    evt.preventDefault()
    const person = persons.find(person => person.name === newName)
    if(person) {
      handleUpdate(person)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setShowPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotifType('success')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
            setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotifType('error')
        setMessage(error.response.data.error)
      })
    }
  }

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      deleteOne(person.id).then(() => {
        const filteredPersons = persons.filter(p => p.id !== person.id)
        setPersons(filteredPersons)
        setShowPersons(filteredPersons)
      }).catch(() => {
        setNotifType('error')
        setMessage(
            `Information of ${person.name} has already been removed from server`
        )
      })
    }
  }

  const handleUpdate = (person) => {
    if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = {
        name: person.name,
        number: newNumber
      }
      update(person.id, updatedPerson).then(returnedPerson => {
        const filteredPersons = persons.filter(p => p.id !== person.id)
        setPersons(filteredPersons.concat(returnedPerson))
        setShowPersons(filteredPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotifType('success')
        setMessage(
          `Updated ${returnedPerson.name}`
        )
        setTimeout(() => {
            setMessage(null)
        }, 5000)
      }).catch((error) => {
        setNotifType('error')
        if(error) {
          setMessage(error.response.data.error)
        } else {
          setMessage(
            `Information of ${person.name} has already been removed from server`
          )
        }
      })
    }
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
      <Notification message={message} type={notifType} />
      <Filter search={search} onSearch={onSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons showPersons={showPersons} click={handleDelete} />
    </div>
  )
}

export default App