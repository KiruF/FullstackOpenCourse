import { useState } from 'react'

const App = () => {

  const title = 'Phonebook'

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040 - 1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    if(persons.find(person => person.number === newNumber)){
      alert(`A Person with ${newNumber} is already added to the ${title.toLowerCase()}`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  const handleNewNameInput = (event) =>
    setNewName(event.target.value)

  const handleNewNumberInput = (event) =>
    setNewNumber(event.target.value)

  return (
    <div>

      <h2>{title}</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewNameInput} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name + person.number}>
          {person.name} {person.number}
        </div>)}

    </div>
  )
}

export default App