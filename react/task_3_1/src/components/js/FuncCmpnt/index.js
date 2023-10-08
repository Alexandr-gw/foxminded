import React, { useState } from "react";
import "../../../assets/css/App.css";

function FuncCmpnt () {
  const [counter, setCounter] = useState(0)

  const plusBtn = () => {
    setCounter((prev) => prev + 1)
  }

  const minusBtn = () => {
    setCounter((prev) => prev - 1)
  }

  return (
    <div className="wrapper">
      <p>Function: </p>
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

export default FuncCmpnt