import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Cell from "./Cell";

function makeCellsRows(count: number, { grid: selected, onClick }: GridProps) {
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
                grid={selected}
                key={j + i}
              />
            );
          })}
      </TableRow>
    ));
}

interface GridProps {
  grid: Array<number[]>;
  onClick: (col: number) => void;
}

export default function Grid({ grid, onClick }: GridProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: "30px", width: "60%", height: "60%" }}
    >
      <Table>
        <TableBody>{makeCellsRows(6, { grid: grid, onClick })}</TableBody>
      </Table>
    </TableContainer>
  );
}
