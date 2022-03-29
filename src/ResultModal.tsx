import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { GameState } from "./Models";

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
};

function makeResult(gameState: GameState) {
  switch (gameState) {
    case "Lose":
      return <Typography sx={{ color: "#ff3d00" }}>You Lose</Typography>;
    case "Win":
      return <Typography sx={{ color: "#4caf50" }}>You WIN!!!</Typography>;
    default:
      return <Typography>It's a Draw</Typography>;
  }
}

export default function ResultModal({ gameState, reset }: ResultModalProps) {
  return (
    <Modal open={gameState !== "Playing"} onClose={() => {}}>
      <Box sx={style}>
        {makeResult(gameState)}
        <Box sx={{ paddingTop: "20px" }}>
          <Button variant="outlined" color="primary" onClick={reset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
