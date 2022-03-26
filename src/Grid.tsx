import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Cell from "./Cell";
import ValuesModel from "./ModelValues";

function makeCellsRows(count: number, { selected, onClick }: GridProps) {
  return Array(count)
    .fill(undefined)
    .map((_, i) => (
      <TableRow key={i}>
        {Array(7)
          .fill(undefined)
          .map((_, j) => {
            const id = i * 7 + j + 1;
            /** "i * 7" so that the id will be sequencial every row "j + 1" since the indexc start at 0*/
            return (
              <Cell id={id} onClick={onClick} values={selected} key={id} />
            );
          })}
      </TableRow>
    ));
}

interface GridProps {
  selected: ValuesModel;
  onClick: (id: number) => void;
}

export default function Grid({ selected, onClick }: GridProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: "30px", width: "60%", height: "60%" }}
    >
      <Table>
        <TableBody>{makeCellsRows(6, { selected, onClick })}</TableBody>
      </Table>
    </TableContainer>
  );
}
