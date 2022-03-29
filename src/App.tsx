import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "./Grid";
import "./App.css";
import { BackendResponse, GameStatus, Player } from "./Models";
import ResultModal from "./ResultModal";

function colNotFull(col: number, grid: Array<number[]>) {
  return grid[0][col] <= 0;
}

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
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    aiHasMoved: true,
    state: "Playing",
  });

  function move(col: number) {
    if (
      gameStatus.aiHasMoved &&
      colNotFull(col, grid) &&
      gameStatus.state === "Playing"
    ) {
      const newGrid = makeGridValues(col, 1, grid);
      setGrid(newGrid);
      setGameStatus({ ...gameStatus, aiHasMoved: false });

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
        .then((aiData: BackendResponse) => {
          if (aiData.game_state !== "Win") {
            setGrid(makeGridValues(aiData.choice, 2, newGrid));
          }
          setGameStatus({ aiHasMoved: true, state: aiData.game_state });
        })
        .catch((e) => console.log("error: ", e));
    }
  }

  function reset() {
    setGrid([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    setGameStatus({ aiHasMoved: true, state: "Playing" });
  }

  return (
    <Box>
      <ResultModal gameState={gameStatus.state} reset={reset} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          paddingRight: "30px",
          paddingTop: "30px",
        }}
      >
        <Button variant="outlined" color="secondary" onClick={reset}>
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
