import { useState } from 'react'


const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine  = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value} {text === "positive" ? "%" : ""}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good - bad)/total
  let positive = good / total * 100

  if (total > 0)
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine  text="good" value={good} />
            <StatisticLine  text="neutral" value={neutral} />
            <StatisticLine  text="bad" value={bad} />
            <StatisticLine  text="all" value={total} />
            <StatisticLine  text="average" value={average} />
            <StatisticLine  text="positive" value={positive} />
          </tbody>
        </table>
      </>
    )
  else
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
}

const App = () => {
  // save total of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={() => setGood(good + 1)} />
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" onClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App