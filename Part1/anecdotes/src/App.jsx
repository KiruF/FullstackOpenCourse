import { useState } from 'react'

const GetRandomInt = (maxValue) =>
  Math.floor(Math.random() * maxValue)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const maxIndex = anecdotes.length

  const [selected, setSelected] = useState(GetRandomInt(maxIndex))

  const onRndButtonClick = () => {
    // Initialise random index
    let randomIndex = GetRandomInt(maxIndex)

    // Ensure that the generated index is not the same as the previous one
    while (randomIndex === selected) {
      randomIndex = GetRandomInt(maxIndex)
    }
    // Update selected and rerender the page
    setSelected(randomIndex)
  }

  return (
    <div>

      <p>{anecdotes[selected]}</p>

      <button onClick={onRndButtonClick}>
        next software development piece of wisdom, please
      </button>
    </div>
  )
}

export default App