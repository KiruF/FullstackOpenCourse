import { useState } from 'react'

const Filter = ({ value, onValueChange }) =>
  <div>filter shown with
    <input
      value={value}
      onChange={onValueChange} />
  </div>

const PersonForm = (props) =>
  <form onSubmit={props.addPerson}>
    <div>
      name: <input
        value={props.name}
        onChange={props.nameChangeHandler} />
    </div>
    <div>
      number: <input
        value={props.number}
        onChange={props.numberChangeHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ people }) =>
  people.map(contact =>
    <div key={contact.id}>
      {contact.name} {contact.number}
    </div>)

const App = () => {
  const title = 'Phonebook'

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getContactsToShow = () => {
    const filterLower = filter.toLowerCase()
    return (filter.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterLower))
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

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the ${title.toLowerCase()}`)
      return
    }

    if (persons.find(person => person.number === newNumber)) {
      alert(`A Person with ${newNumber} is already added to the ${title.toLowerCase()}`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }))
    setNewName('')
    setNewNumber('')
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

      <Persons people={getContactsToShow()} />

    </div>
  )
}

export default App