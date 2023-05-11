import { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const FrequencyInput = ({title, entryNumber, setResponses}) => {
  const [counter, setCounter] = useState(0);

  const displayCounter = counter > 0;

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
    if(typeof(setResponses) == "function") {
      setResponses(counter + 1, entryNumber);
    }
  };

  const handleDecrement = () => {
    setCounter((prev) => prev - 1);
    if(typeof(setResponses) == "function") {
      setResponses(counter + 1, entryNumber);
    }
  };

  return (
    <div>
      <p>{title}</p>
      <ButtonGroup size="small" aria-label="small outlined button group">
        {displayCounter && <Button onClick={handleDecrement}>-</Button>}
        {displayCounter && <Button disabled>{counter}</Button>}
        <Button onClick={handleIncrement}>+</Button>
      </ButtonGroup>
    </div>
  );
};

export default FrequencyInput;