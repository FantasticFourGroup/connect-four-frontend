import React from "react";
import { Box, CircularProgress, Modal } from "@mui/material";

interface SpinerProps {
  open: boolean;
}

export default function Spinner({ open }: SpinerProps) {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
}
