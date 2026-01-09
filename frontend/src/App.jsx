import { useEffect } from "react";
import { useState } from "react";

import "./App.css";

function App() {
  const [presetCount, setPresetCount] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isPresetActive, setIsPresetActive] = useState(true); //for time mode selection set drives the ui

  const [currentNum, setCurrentNum] = useState(0); // for timing logic

  //create a state that determines is the countdown is running or not
  const [isRunning, setIsRunning] = useState(false); // not running on render

  //first create state to add inputs to current num
  useEffect(() => {
    isPresetActive ? setCurrentNum(Number(presetCount)) : setCurrentNum(Number(customInput));
    console.log(`current num is ${currentNum}`);
  },[isPresetActive, presetCount,customInput]);// these all effect how this effect runs


  // then take current num and decrement it using set timeout

    useEffect(()=>{
      if(currentNum > 0 && isRunning){
   const id = setTimeout(()=>{
    setCurrentNum(currentNum -1)
  }, 1000)
      return ()=> clearTimeout(id)};
     }, [isRunning, currentNum]);

  return (
    <>
      <div className="menu">
        <div className="precount">
          <h3> Use one of the preset counts </h3>
          <select
            onChange={(e) => {
              setPresetCount(e.target.value);
              // console.log(e.target.value);
              setIsPresetActive(true);
            }}
          >
            <option value="0">Choose a preset count </option>
            <option value="5">5 breaths </option>
            <option value="10">10 breaths</option>
            <option value="15">15 breaths</option>
            <option value="20">20 breaths</option>
            <option value="30">30 breaths</option>
            <option value="50">50 breaths</option>
          </select>
        </div>

        <div className="customcount">
          <h3>Or set your own preference </h3>
          <input
            type="number"
            min="1"
            placeholder="Enter Custom Amount"
            onChange={(e) => {
              setCustomInput(e.target.value);
              // console.log(e.target.value);
              setIsPresetActive(false);
            }}
          ></input>
        </div>
      </div>

      <div className="breathcounter">
        <div countdisplay>
          <h1> {currentNum}</h1>
          <button onClick={()=>{setIsRunning(true)}}>Start</button>
          <button onClick={()=>{setIsRunning(false)}}>Pause</button>
          <button onClick={()=>{setIsRunning(false); setCurrentNum(Number(isPresetActive? presetCount: customInput))}}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
