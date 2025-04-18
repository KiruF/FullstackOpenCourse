import { useState } from 'react'

const App = () => {

  const title = 'Phonebook'

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (newName.length === 0) {
      alert(`Enter a name, please, before adding a new Person to the ${title.toLowerCase()}`)
      return
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the ${title.toLowerCase()}`)
      return
    }

    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  const handleNewNameInput = (event) =>
    setNewName(event.target.value)

  return (
    <div>

      <h2>{title}</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          {person.name}
        </div>)}

    </div>
  )
}

export default App