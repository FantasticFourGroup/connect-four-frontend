import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "./Grid";
import "./App.css";
import { BackendResponse, Depth, GameStatus, Player } from "./Models";
import ResultModal from "./ResultModal";
import Spinner from "./Spiner";
import DepthSelector from "./DepthSelector";

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

async function fetchBackEnd(grid: Array<number[]>, depth: Depth) {
  return fetch(`https://connect-four-backend.onrender.com/solve-board`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grid: grid,
      depth: depth,
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
    depth: 4,
  });

  useEffect(() => {
    fetchBackEnd(emptyGrid, 4).then(() => {
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

      fetchBackEnd(newGrid, gameStatus.depth)
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
        <DepthSelector
          value={gameStatus.depth}
          onChange={(depth: Depth) => {
            reset();
            setGameStatus({ ...gameStatus, depth });
          }}
        />
        <Button variant="outlined" color="secondary" onClick={reset}>
          Reset
        </Button>
      </Box>
      <Box
        sx={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          grid={grid}
          onClick={move}
          progressCurser={!gameStatus.aiHasMoved}
        />
      </Box>
    </Box>
  );
}

export default App;
