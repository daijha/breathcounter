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
  const [isVisible, setIsVisible] = useState(false); // for word fading logic
  const [isVisible1, setIsVisible1] = useState(false); // for word fading logic( completion)

  const [cycle, setCycle] = useState(0);
  const messages = [
    "Great Work!",
    "Nice Job",
    "Well Done",
    "You did it!",
    "Thank Yourself",
    "Beautifully Done",
  ];
  const [doneMsg, setDoneMsg] = useState("");

  //first create state to add inputs to current num
  useEffect(() => {
    isPresetActive
      ? setCurrentNum(Number(presetCount))
      : setCurrentNum(Number(customInput));
    console.log(`current num is ${currentNum}`);
  }, [isPresetActive, presetCount, customInput]); // these all effect how this effect runs

  // then take current num and decrement it using set timeout( relies on breathing toggle)
  //toggle the visibility of the breathing instructions combined the 2 effects into 1
  useEffect(() => {
    let id; // gives the cleartimeout id access(scope)
    if (currentNum > 0 && isRunning) {
      id = setTimeout(() => {
        setIsVisible((prev) => !prev); // toggle
        setCycle(cycle + 1); // let the toggle run all the way through (1 cycle)
        const newNum = cycle + 1; // update cycle count
        if (newNum % 2 === 0) {
          setCurrentNum((prev) => prev - 1); //updates countdown after cycle completes
        }
      }, 2000);
    }
    return () => clearTimeout(id);
  }, [isRunning, currentNum, cycle]);

  useEffect(() => {
    if (currentNum === 0 && isRunning) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      const selected = messages[randomIndex];
      setDoneMsg(selected);
      setIsVisible1(true);
    }
  }, [currentNum, doneMsg, isRunning]);

  //ANOTHER EFFECT FOR THE FADE CONTROL ON THE COMPLETION MSG
  useEffect(() => {
    if (!isVisible1) {
      let id1 = setTimeout(() => {
        setDoneMsg(""); //resets the completion msg
      }, 1000);
      return () => clearTimeout(id1);
    }
  }, [isVisible1]);
  return (
    <>
      <h1>Breath Counter</h1>
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

        <div className="customCount">
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

      <div className="breathCounter">
        <h1 className={isVisible ? `fade visible` : `fade hidden`}>
          Breathe In
        </h1>
        <h1 className={isVisible ? `fade hidden` : `fade visible`}>
          Breathe Out
        </h1>
        <h1> {currentNum}</h1>
        <h2 className={isVisible1 ? `fade visible` : `fade hidden`}>
          {doneMsg}
        </h2>
      </div>
      <div className="btnDisplay">
        <button
          onClick={() => {
            setIsRunning(true);
            setIsVisible1(false); // hides the last message on start
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setIsVisible1(false); // hides the last message on start

            setCurrentNum(Number(isPresetActive ? presetCount : customInput));
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
