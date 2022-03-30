import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "./Grid";
import "./App.css";
import { BackendResponse, GameStatus, Player } from "./Models";
import ResultModal from "./ResultModal";
import Spinner from "./Spiner";

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

async function fetchBackEnd(grid: Array<number[]>) {
  return fetch(`https://connect-four-backend.onrender.com/solve-board`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grid: grid,
      depth: 4,
      turn: 2,
    }),
  }).then((response) => response.json());
}

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function App() {
  const [grid, setGrid] = useState(emptyGrid);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    aiHasMoved: true,
    state: "Playing",
    backendLoaded: false,
  });

  useEffect(() => {
    fetchBackEnd(emptyGrid).then(() => {
      setGameStatus((perviousStatus) => ({
        ...perviousStatus,
        backendLoaded: true,
      }));
    });
  }, []);

  function move(col: number) {
    if (
      gameStatus.aiHasMoved &&
      colNotFull(col, grid) &&
      gameStatus.state === "Playing"
    ) {
      const newGrid = makeGridValues(col, 1, grid);

      setGrid(newGrid);
      setGameStatus({ ...gameStatus, aiHasMoved: false });

      fetchBackEnd(newGrid)
        .then((aiData: BackendResponse) => {
          if (aiData.game_state !== "Win") {
            setGrid(makeGridValues(aiData.choice, 2, newGrid));
          }
          setGameStatus({
            ...gameStatus,
            aiHasMoved: true,
            state: aiData.game_state,
          });
        })
        .catch((e) => console.log("error: ", e));
    }
  }

  function reset() {
    setGrid(emptyGrid);
    setGameStatus({ ...gameStatus, aiHasMoved: true, state: "Playing" });
  }

  return (
    <Box>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Common Pixel",
          fontSize: 50,
        }}
      >
        Connect Four
      </h1>
      <Spinner open={!gameStatus.backendLoaded} />
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
