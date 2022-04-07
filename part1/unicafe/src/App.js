import { useState } from 'react'
import { Button, Statistics } from './components'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [total, setTotal] = useState(0)

  const addGood = () => {
    setAll(all + 1)
    setTotal(total + 1)
    setGood(good + 1)
  }

  const addNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setAll(all + 1)
    setTotal(total - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={addGood} text="Good" />
      <Button onClick={addNeutral} text="Neutral" />
      <Button onClick={addBad} text="Bad" />
      <Statistics all={all} good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App