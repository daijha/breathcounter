import { useState } from "react";
import "./App.css";

function App() {
  const [presetCount, setPresetCount] = useState("");
  const [customInput, setCustomInput] = useState("");
  const isPresetActive = true; //for time mode selection 
  return (
    <>
    <div className="menu">
      <div className="precount">
        <h3> Use one of the preset counts </h3>
        <select
          onChange={(e) => {
            setPresetCount(e.target.value);
            console.log(e.target.value);
            isPresetActive = true;
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
            console.log(e.target.value);
            isPresetActive = false;
          }}
        ></input>
      </div>
</div>


      <div className="breathcounter">
        
        <div countdisplay>
          <h1> {isPresetActive? presetCount:customInput }</h1>
          <button>Start</button>
          <button>Pause</button>
          <button>Reset</button>

          </div>

      </div>
    </>
  );
}

export default App;
