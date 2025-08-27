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
  console.log('render', people.length, 'people')

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
        addPerson={(event) => {
          event.preventDefault
          addPerson(newName, newNumber, people, setPeople, setNewName, setNewNumber)
        }} />

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

function findPerson(people, name) {
  const person = people.find(p => p.name === name)
  if (person)
    return { found: true, person: person }
  else
    return false
}

const getContactsToShow = (people, filter) => {
  const filterLower = filter.toLowerCase()
  return (filter.length === 0
    ? people
    : people.filter(person => person.name.toLowerCase().includes(filterLower))
  )
}

const addPerson = (newName, newNumber, people, setPeople, setNewName, setNewNumber) => {
  if (newName.length === 0) {
    alert(`Enter a name, please, before adding a new Person to the ${title.toLowerCase()}!`)
    return
  }

  if (newNumber.length === 0) {
    alert(`Can't add a Person to the ${title.toLowerCase()} without a number!`)
    return
  }

  const searchByName = findPerson(people, newName)
  if (searchByName.found) {
    if (people.find(person => person.number === newNumber)) {
      alert(`A Person with ${newNumber} is already added to the ${title.toLowerCase()}`)
      return
    }
    const foundPerson = searchByName.person
    const replace = window.confirm(
      `${foundPerson.name} is already in the phonebook, replace the old number with a new one?`)

    if (replace) {
      const newPerson = { ...foundPerson, number: newNumber }
      peopleService
        .update(foundPerson.id, newPerson)
        .then(updatedPerson => {
          console.log(updatedPerson)
          setPeople(people.map(person => person.id === foundPerson.id ? updatedPerson : person))
          setNewName('')
          setNewNumber('')
        })
    }
    return
  }

  if (people.find(person => person.number === newNumber)) {
    alert(`A Person with ${newNumber} is already added to the ${title.toLowerCase()}`)
    return
  }

  const newPerson = {
    name: newName,
    number: newNumber
  }

  peopleService
    .create(newPerson)
    .then(registeredPerson => {
      console.log(registeredPerson)

      setPeople(people.concat(registeredPerson))
      setNewName('')
      setNewNumber('')
    })
}
