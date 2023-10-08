import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0)

  const plusBtn = () => {
    setCounter(counter + 1)
  }

  const minusBtn = () => {
    setCounter(counter - 1)
  }

  return (
    <div className="wrapper">
      <button className="button pls"
        onClick={plusBtn}>plus</button>
      <span className="counterOutput">
        {counter}
      </span>
      <button className="button mns"
        onClick={minusBtn}>minus</button>
    </div>
  )
}

export default App