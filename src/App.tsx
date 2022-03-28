import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "./Grid";
import "./App.css";

type Player = 1 | 2;

function makeGridValues(col: number, player: Player, grid: Array<number[]>) {
  const copy = grid.map((row) => [...row]);
  for (let i = copy.length - 1; i >= 0; i--) {
    if (copy[i][col] <= 0) {
      copy[i][col] = player;
      return copy;
    }
  }
  return copy;
}

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [aiHasMoved, setAiHasMoved] = useState(true);

  function move(col: number) {
    if (aiHasMoved && grid[0][col] <= 0) {
      const newGrid = makeGridValues(col, 1, grid);
      setGrid(newGrid);
      setAiHasMoved(false);

      fetch(`https://connect-four-backend.onrender.com/solve-board`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grid: newGrid,
          depth: 4,
          turn: 2,
        }),
      })
        .then((response) => response.json())
        .then((aiMove) => {
          setGrid(makeGridValues(aiMove, 2, newGrid));
        })
        .then(() => {
          setAiHasMoved(true);
        })
        .catch((e) => console.log("error: ", e));
    }
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
            setGrid([
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
            ]);
            setAiHasMoved(true);
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
        <Grid grid={grid} onClick={move} />
      </Box>
    </Box>
  );
}

export default App;
