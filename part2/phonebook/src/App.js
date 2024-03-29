import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  
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
    else {
      let find = persons.find(person => person.name === newName)
      if (find !== undefined) {
        const personObject = { ...find, number: newNumber }
        let c = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        // update the already existing person
        if (c === true) {
          personService
            .update(find.id, personObject)
            // if the update is successfull
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== find.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
              setNotificationMessage(`Updated ${returnedPerson.name} to the server`)
              setNotificationType("success")
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
              }, 5000)
            })
            // if the update fails
            .catch(error => {
              setNotificationMessage(`Information of ${find.name} has already been removed from server`)
              setNotificationType("error")
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
              }, 5000)
              setPersons(persons.filter(n => n.id !== find.id))
            })
        }
      }
      // else the person must be created
      else {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService
          .create(personObject)
          // create successfull
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Added ${returnedPerson.name} to the server`)
            setNotificationType("success")
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
          })
          // create failed
          .catch(error => {
            console.log(error.response)
            if (error.response.data.error.startsWith("Person validation failed: name")) {
              setNotificationMessage("Insert a name that has more than three characters")
            } else if (error.response.data.error.startsWith("Person validation failed: number")) {
              setNotificationMessage("Insert a valid number, at least 8 characters, valid numbers are: 03-123456, 039-12345")
            } else {
              setNotificationMessage(`There was an error on the creation of ${newName}, retry again`)
            }
            setNotificationType("error")
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
          })
      }
    }
  }
  const deletePerson = id => {
    let find = persons.find(p => p.id === id)
    let c = window.confirm(`Delete ${find.name}?`)
    if (c === true) {
      personService
        .deletePerson(id)
        // delete successfull
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        // delete fails
        .catch(error => {
          setNotificationMessage(`The person ${find.name} was already removed from server`)
          setNotificationType("error")
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  let filteredPersons = persons.filter(person => person.name.indexOf(filter) !== -1)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />
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