import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import peopleService from './services/people'

const title = 'Phonebook'

const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(allPeople =>
        setPeople(allPeople))
  }, [])

  const deletePerson = (person) => {
    const shouldDelete = window.confirm(`Are you sure, you would like to Delete ${person.name}?`)
    if (!shouldDelete)
      return

    const id = person.id
    console.log(`deleting at id: ${id}`)
    peopleService
      .deleteAt(id)
      .then(deletedPerson => {
        console.log(deletedPerson)
        setPeople(people
          .filter(person => person.id != deletedPerson.id))
      })
      .catch(error => {
        alert(`Failed to delete ${person.name}`)
        console.log(error)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length === 0) {
      alert(`Enter a name, please, before adding a new Person to the ${title.toLowerCase()}!`)
      return
    }

    if (newNumber.length === 0) {
      alert(`Can't add a Person to the ${title.toLowerCase()} without a number!`)
      return
    }

    const personFoundByName = people
      .find(p => p.name === newName)
    const personFoundByPhNum = people
      .find(person => person.number === newNumber)

    if (personFoundByName && personFoundByPhNum) {
      alert(`${newName} is already added with phone number: ${newNumber}`)
      return
    }
    else if (personFoundByPhNum) {
      alert(`A Person with ${newNumber} is already added to the ${title.toLowerCase()}.`)
      return
    }

    if (personFoundByName) {
      const overridePhNum = window.confirm(
        `${personFoundByName.name} is already in the phonebook, replace the old number with a new one?`)

      if (overridePhNum) {
        const newPerson = { ...personFoundByName, number: newNumber }
        peopleService
          .update(personFoundByName.id, newPerson)
          .then(updatedPerson => {
            setPeople(people
              .map(person => person.id === personFoundByName.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Failed to override ${personFoundByName.name}'s phone number.`)
            console.log(error)
          })
      }

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    peopleService
      .create(newPerson)
      .then(registeredPerson => {
        setPeople(people.concat(registeredPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`Failed to add ${newName} to the server`)
        console.log(error)
      })
  }

  return (
    <div>

      <h2>{title}</h2>

      <Filter
        value={filter}
        onValueChange={(event) => setFilter(event.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        nameChangeHandler={(event) => setNewName(event.target.value)}
        number={newNumber}
        numberChangeHandler={(event) => setNewNumber(event.target.value)}
        addPerson={addPerson} />

      <h3>Numbers</h3>

      <People
        people={getContactsToShow(people, filter)}
        deletePerson={deletePerson} />

    </div>
  )
}

export default App

const Filter = ({ value, onValueChange }) =>
  <div>filter shown with
    <input
      value={value}
      onChange={onValueChange} />
  </div>

const People = ({ people, deletePerson }) => {
  return (
    <ul>
      {
        people.map((person) =>
        (<Person
          key={person.id}
          person={person}
          deletionHandler={() => deletePerson(person)} />)
        )
      }
    </ul>
  )
}

const getContactsToShow = (people, filter) => {
  const filterLower = filter.toLowerCase()
  return (filter.length === 0
    ? people
    : people.filter(person => person.name.toLowerCase().includes(filterLower))
  )
}
