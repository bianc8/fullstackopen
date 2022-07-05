import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  

  const handleFilterChange = (event) => {setFilter(event.target.value)}
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}  

  const addPerson = (event) => {
    event.preventDefault()
    // check if form has name and number
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Fill out all fields")
    }
    // check existance of same name
    else if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const deletePerson = id => {
    console.log(`delete person ${id}`)
    
    personService
      .del(id)
      .then(returnedPerson => {
        console.log('return person ', returnedPerson)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`the person was already deleted from server`)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  let filteredPersons = persons.filter(person => person.name.indexOf(filter) !== -1)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          onChange={handleFilterChange}
        />
      </div>
      <h3>Add a new contact</h3>
        <PersonForm
          onSubmit={addPerson}
          name={newName}
          number={newNumber}
          nameChange={handleNameChange}
          numberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        onClick={deletePerson}
      />
    </div>
  )
}

export default App