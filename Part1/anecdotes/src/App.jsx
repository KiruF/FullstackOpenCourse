import { useState } from 'react'

const GetRandomInt = (maxValue) =>
  Math.floor(Math.random() * maxValue)

const TopAnecdote = ({ title, votesCount, topIndex, anecdotes }) => {
  if (topIndex === -1)
    return

  return (
    <Anecdote
      title={title}
      anecdote={anecdotes[topIndex]}
      votesCount={votesCount} />
  )
}

const Anecdote = ({ title, anecdote, votesCount }) =>
  <div>
    <h2>{title}</h2>
    <p>
      {anecdote}<br />
      {`has ${votesCount} votes`}
    </p>
  </div>

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
  const [votes, setVotes] = useState(Array(maxIndex).fill(0))
  const [topIndex, setTop] = useState(-1)

  const handleNextAnecdote = () => {
    // Initialise random index
    let randomIndex = GetRandomInt(maxIndex)

    // Ensure that the generated index is not the same as the previous one
    // Safeguard to avoid infinite loop
    let counter = 0;
    while (randomIndex === selected && counter < 100) {
      randomIndex = GetRandomInt(maxIndex)
      counter++
    }
    // Update selected and rerender the page
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected]++

    setVotes(votesCopy)

    updateTop(votesCopy)
  }

  const updateTop = (votes) => {

    let currentTopIndex = topIndex
    let maxVotes = currentTopIndex === -1
      ? 0
      : votes[topIndex]

    for (let index = 0; index < votes.length; index++) {
      const votesCount = votes[index]
      if (maxVotes < votesCount) {
        maxVotes = votesCount
        currentTopIndex = index
      }
    }

    if (currentTopIndex != topIndex) {
      setTop(currentTopIndex)
    }
  }

  return (
    <div>
      <Anecdote
        title='Anecdote of the day'
        anecdote={anecdotes[selected]}
        votesCount={votes[selected]} />

      <button onClick={handleVote}>
        vote
      </button>

      <button onClick={handleNextAnecdote}>
        next anecdote
      </button>

      <TopAnecdote
        topIndex={topIndex}
        anecdotes={anecdotes}
        title='Anecdote with most votes'
        votesCount={votes[topIndex]} />
    </div>
  )
}

export default App