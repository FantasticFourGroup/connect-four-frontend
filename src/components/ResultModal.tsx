import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { GameState } from "../types/Models";
import { useState } from "react";

interface ResultModalProps {
  gameState: GameState;
  reset: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const largePixel = {
  fontSize: 40,
  fontWeight: 900,
  fontFamily: "Common Pixel",
};

function makeResult(gameState: GameState) {
  switch (gameState) {
    case "Lose":
      return (
        <Typography sx={{ ...largePixel, color: "#ff3d00" }}>
          You Lose
        </Typography>
      );
    case "Win":
      return (
        <Typography sx={{ ...largePixel, color: "#4caf50" }}>
          You WIN!!!
        </Typography>
      );
    default:
      return <Typography>It's a Draw</Typography>;
  }
}

export default function ResultModal({ gameState, reset }: ResultModalProps) {
  const [opacity, setOpacity] = useState("90%");
  return (
    <Modal open={gameState !== "Playing"} onClose={() => {}}>
      <Box
        sx={{ ...style, opacity }}
        onMouseOver={() => {
          setOpacity("100%");
        }}
        onMouseOut={() => {
          setOpacity("90%");
        }}
      >
        {makeResult(gameState)}
        <Box sx={{ paddingTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={reset}>
            Play Again
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
