import { useState } from "react";
import "./index.css";

const options = [
  {
    title: "Dissatisfied",
    percentage: 0,
  },
  {
    title: "Okay",
    percentage: 5,
  },
  {
    title: "Good",
    percentage: 10,
  },
  {
    title: "Amazing",
    percentage: 20,
  },
];

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service ?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onhandleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <span>How much was the bill ?</span>
      <input
        type="text"
        placeholder="Type in your bill"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <span>{children}</span>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {options.map((el, i) => (
          <option value={el.percentage} key={i} text={el.title}>
            {el.title}({el.percentage})%
          </option>
        ))}
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip}(${bill}+${tip})
    </h3>
  );
}
function Reset({ onhandleReset }) {
  return <button onClick={onhandleReset}>Reset</button>;
}
