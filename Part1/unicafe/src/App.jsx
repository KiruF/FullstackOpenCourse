import { useState } from 'react'

const FeedbackButton = ({ value, setValue, buttonName }) =>
  <button onClick={() => setValue(value + 1)}>
    {buttonName}
  </button>

const Feedback = ({ title, value }) =>
  <div>
    {title} {value}
  </div>

function ProcessStats({ good, neutral, bad }) {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePecent = good / all * 100

  return { all, average, positivePecent }
}

const App = () => {
  // save clicks of each button to its own state  
  const [good, setGood] = useState(0)
  const goodWord = "good"
  const [neutral, setNeutral] = useState(0)
  const neutralWord = "neutral"
  const [bad, setBad] = useState(0)
  const badWord = "bad"
  const { all, average, positivePecent } = ProcessStats({ good, neutral, bad })

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
      <Feedback
        title={goodWord} value={good} />
      <Feedback
        title={neutralWord} value={neutral} />
      <Feedback
        title={badWord} value={bad} />
      <Feedback
        title={"all"} value={all} />
      <Feedback
        title={"average"} value={average} />
      <Feedback
        title={"positive"} value={positivePecent + `%`} />

    </>
  )
}

export default App