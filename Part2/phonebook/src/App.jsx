import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import peopleService from './services/people'

const App = () => {
  const title = 'Phonebook'

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then((allPeople) =>
        setPeople(allPeople))
  }, [])
  console.log('render', people.length, 'people')

  const getContactsToShow = () => {
    const filterLower = filter.toLowerCase()
    return (filter.length === 0
      ? people
      : people.filter(person => person.name.toLowerCase().includes(filterLower))
    )
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

    if (people.find(person => person.name === newName)) {
      alert(`${newName} is already added to the ${title.toLowerCase()}`)
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

      <People people={getContactsToShow()} />

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

const People = ({ people }) => {
  return (
    <ul>
      {
        people.map((person) =>
        (<Person
          key={person.id}
          person={person} />))
      }
    </ul>
  )
}