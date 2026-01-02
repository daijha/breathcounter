import { useState } from "react";
import "./App.css";

function App() {
  const [presetCount, setPresetCount] = useState("");
  const [customInput, setCustomInput] = useState("");
  return (
    <>
    <div className="menu">
      <div className="precount">
        <h3> use one of the preset counts </h3>
        <select
          onChange={(e) => {
            setPresetCount(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="0">choose a preset count </option>
          <option value="5">5 breaths </option>
          <option value="10">10 breaths</option>
          <option value="15">15 breaths</option>
          <option value="20">20 breaths</option>
          <option value="30">30 breaths</option>
          <option value="50">50 breaths</option>
        </select>
      </div>

      <div className="customcount">
        <h3>or set your own preference </h3>
        <input
          type="number"
          min="1"
          placeholder="Enter Custom Amount"
          onChange={(e) => {
            setCustomInput(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
      </div>
</div>
      <div className="breathcounter">

      </div>
    </>
  );
}

export default App;
