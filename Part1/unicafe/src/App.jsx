import { useState } from 'react'

const FeedbackButton = ({ onClick, buttonName }) =>
  <button onClick={onClick}>
    {buttonName}
  </button>

const StatisticsLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({
  goodData: { good, goodWord },
  neutralData: { neutral, neutralWord },
  badData: { bad, badWord } }) => {

  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const average = (good - bad) / all
  const positivePecent = good / all * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text={goodWord} value={good} />
        <StatisticsLine text={neutralWord} value={neutral} />
        <StatisticsLine text={badWord} value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positivePecent + ` %`} />
      </tbody>
    </table>
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
        onClick={() => setGood(good + 1)} buttonName={goodWord} />
      <FeedbackButton
        onClick={() => setNeutral(neutral + 1)} buttonName={neutralWord} />
      <FeedbackButton
        onClick={() => setBad(bad + 1)} buttonName={badWord} />
      <h1>statistics</h1>
      <Statistics
        goodData={{ good, goodWord }}
        neutralData={{ neutral, neutralWord }}
        badData={{ bad, badWord }} />
    </>
  )
}

export default App