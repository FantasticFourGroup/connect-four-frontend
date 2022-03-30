import React from "react";
import TableCell from "@mui/material/TableCell";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Slide } from "@mui/material";

interface CellProps {
  row: number;
  col: number;
  grid: Array<number[]>;
  onClick: (col: number) => void;
}

const colors: { [key: number]: string } = {
  0: "transparent",
  1: "blue",
  2: "red",
};

export default function Cell({ row, col, onClick, grid: values }: CellProps) {
  const player = values[row][col];
  return (
    <TableCell
      align="center"
      sx={{
        border: "solid",
        height: "70px",
        width: "70px",
        padding: "0px",
        cursor: values[0][col] <= 0 ? "pointer" : "default",
      }}
      onClick={() => {
        onClick(col);
      }}
    >
      <Slide direction="down" in={player > 0} mountOnEnter unmountOnExit>
        <FiberManualRecordIcon sx={{ fontSize: 50, color: colors[player] }} />
      </Slide>
    </TableCell>
  );
}
