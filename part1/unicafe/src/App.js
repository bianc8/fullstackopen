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

const Statistics = ({good, neutral, bad, clicks}) => {
  if (clicks > 0)
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine  text="good" value={good} />
            <StatisticLine  text="neutral" value={neutral} />
            <StatisticLine  text="bad" value={bad} />
            <StatisticLine  text="all" value={clicks} />
            <StatisticLine  text="average" value={(good + bad*(-1))/clicks} />
            <StatisticLine  text="positive" value={good * 100 / clicks} />
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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [clicks, setClicks] = useState(0)
  
  const handleClick = (type) => {
    if (type === "good")
      setGood(good + 1)
    else if (type === "neutral")
      setNeutral(neutral + 1)
    else if (type === "bad")
      setBad(bad + 1)
    setClicks(clicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => handleClick("good")} />
      <Button text="neutral" onClick={() => handleClick("neutral")} />
      <Button text="bad" onClick={() => handleClick("bad")} />
      <Statistics good={good} neutral={neutral} bad={bad} clicks={clicks} />
    </div>
  )
}

export default App