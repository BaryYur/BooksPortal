import { useState } from "react";

import { Button } from "@mui/material";

const Component = () => {
  const [counter, setCounter] = useState(0);

  const increaseHandler = () => {
    setCounter(counter => counter + 1);
  }

  return (
    <div>
      <Button variant="contained" onClick={increaseHandler}>Click {counter}</Button>
    </div>
  );
}

export default Component;