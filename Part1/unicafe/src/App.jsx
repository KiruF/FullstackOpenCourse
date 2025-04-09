import { useState } from 'react'

const FeedbackButton = (props) =>
  <button onClick={() => props.setValue(props.value + 1)}>
    {props.buttonName}
  </button>

const Feedback = (props) =>
  <p>
    {props.title} {props.score}
  </p>

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
        value={good}
        setValue={setGood}
        buttonName={goodWord} />
      <FeedbackButton
        value={neutral}
        setValue={setNeutral}
        buttonName={neutralWord} />
      <FeedbackButton
        value={bad}
        setValue={setBad}
        buttonName={badWord} />
      <h1>statistics</h1>
      <Feedback
        title={goodWord}
        score={good} />
      <Feedback
        title={neutralWord}
        score={neutral} />
      <Feedback
        title={badWord}
        score={bad} />
    </>
  )
}

export default App