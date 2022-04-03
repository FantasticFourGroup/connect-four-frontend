import React from "react";
import TableCell from "@mui/material/TableCell";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Slide } from "@mui/material";

interface CellProps {
  row: number;
  col: number;
  grid: Array<number[]>;
  onClick: (col: number) => void;
  progressCurser: boolean;
}

const colors: { [key: number]: string } = {
  0: "transparent",
  1: "blue",
  2: "red",
};

export default function Cell({
  row,
  col,
  onClick,
  grid,
  progressCurser,
}: CellProps) {
  const player = grid[row][col];
  return (
    <TableCell
      align="center"
      sx={{
        border: "solid",
        padding: "0px",
        cursor: progressCurser
          ? "progress"
          : grid[0][col] <= 0
          ? "pointer"
          : "default",
      }}
      onClick={() => {
        onClick(col);
      }}
    >
      <Box
        sx={{
          height: "55px",
          width: "55px",
          margin: "auto",
        }}
      >
        <Slide direction="down" in={player > 0} mountOnEnter unmountOnExit>
          <FiberManualRecordIcon sx={{ fontSize: 50, color: colors[player] }} />
        </Slide>
      </Box>
    </TableCell>
  );
}
