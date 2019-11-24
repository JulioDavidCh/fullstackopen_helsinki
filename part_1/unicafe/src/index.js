import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const StatisticalTable = ({ good, neutral, bad, all }) =>{
  let componentMaker = (name, value) => <tr><td>{name}</td> <td>{value}</td></tr>
  let average = ((good-bad)/(all == 0? 1 : all) * 100).toFixed(1)
  let positive = ((good)/(all == 0? 1 : all) * 100).toFixed(1)
  return (
    <table>
        {componentMaker("good", good)}
        {componentMaker("neutral", neutral)}
        {componentMaker("bad", bad)}
        {componentMaker("all", all)}
        {componentMaker("average", average)}
        {componentMaker("positive", positive + "%")}
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad


  return (
    <div>
      <Header text={"Give feedback"} />
      <Button handleClick={()=> setGood(good + 1)} text="good" />
      <Button handleClick={()=> setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={()=> setBad(bad + 1)} text="bad" />
      <Header text={"Statistics"} />
      <StatisticalTable good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)