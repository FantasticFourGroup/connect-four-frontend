import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Cell from "./Cell";

function makeCellsRows(
  count: number,
  grid: Array<number[]>,
  onClick: (col: number) => void,
  progressCurser: boolean
) {
  return Array(count)
    .fill(undefined)
    .map((_, i) => (
      <TableRow key={i}>
        {Array(7)
          .fill(undefined)
          .map((_, j) => {
            return (
              <Cell
                col={j}
                row={i}
                onClick={onClick}
                grid={grid}
                key={j + i}
                progressCurser={progressCurser}
              />
            );
          })}
      </TableRow>
    ));
}

interface GridProps {
  grid: Array<number[]>;
  onClick: (col: number) => void;
  progressCurser: boolean;
}

export default function Grid({ grid, onClick, progressCurser }: GridProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        padding: "30px",
        width: "60%",
        height: "60%",
        cursor: progressCurser ? "progress" : "pointer",
      }}
    >
      <Table>
        <TableBody>{makeCellsRows(6, grid, onClick, progressCurser)}</TableBody>
      </Table>
    </TableContainer>
  );
}
