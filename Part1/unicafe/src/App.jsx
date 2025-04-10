import { useState } from 'react'

const FeedbackButton = ({ value, setValue, buttonName }) =>
  <button onClick={() => setValue(value + 1)}>
    {buttonName}
  </button>

const Statistics = ({
  goodData: { good, goodWord },
  neutralData: { neutral, neutralWord },
  badData: { bad, badWord } }) => {

  if (good === 0 && neutral === 0 && bad === 0){
    return (
      <div>        
        <p1>No feedback given</p1>
      </div>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePecent = good / all * 100

  return (
    <div>      
      <div>{goodWord} {good}</div>
      <div>{neutralWord} {neutral}</div>
      <div>{badWord} {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positivePecent + ` %`}</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state  
  const [good, setGood] = useState(0)
  const goodWord = "good"
  const [neutral, setNeutral] = useState(0)
  const neutralWord = "neutral"
  const [bad, setBad] = useState(0)
  const badWord = "bad"

  return (
    <>
      <h1>give feedback</h1>
      <FeedbackButton
        value={good} setValue={setGood} buttonName={goodWord} />
      <FeedbackButton
        value={neutral} setValue={setNeutral} buttonName={neutralWord} />
      <FeedbackButton
        value={bad} setValue={setBad} buttonName={badWord} />
      <h1>statistics</h1>
      <Statistics
        goodData={{ good, goodWord }}
        neutralData={{ neutral, neutralWord }}
        badData={{ bad, badWord }} />
    </>
  )
}

export default App