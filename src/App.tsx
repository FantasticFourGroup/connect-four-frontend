import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ValuesModel, { Player } from "./ModelValues";
import Grid from "./Grid";
import "./App.css";

function App() {
  const [selected, setSelected] = useState({} as ValuesModel);
  const [turn, setTurn] = useState("HUM" as Player);

  function move(id: number) {
    setSelected({ ...selected, [id]: turn });
    setTurn(turn === "HUM" ? "AI" : "HUM");
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          paddingRight: "30px",
          paddingTop: "30px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setSelected({});
            setTurn("HUM");
          }}
        >
          Reset
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid selected={selected} onClick={move} />
      </Box>
    </Box>
  );
}

export default App;
