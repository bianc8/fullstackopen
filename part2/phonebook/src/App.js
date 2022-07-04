import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {setFilter(event.target.value)}
  
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {setNewName(event.target.value)}
  
  const [newNumber, setNewNumber] = useState('')
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
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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
      />
    </div>
  )
}

export default App