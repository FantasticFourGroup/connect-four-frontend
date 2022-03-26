import React from "react";
import TableCell from "@mui/material/TableCell";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ValuesModel, { Player } from "./ModelValues";

interface CellProps {
  id: number;
  values: ValuesModel;
  onClick: (id: number) => void;
}

const colors = {
  AI: "red",
  HUM: "blue",
};

function getColor(value: Player) {
  return value ? colors[value] : "transparent";
}

export default function Cell({ id, onClick: setValues, values }: CellProps) {
  const player = values[id];
  return (
    <TableCell
      id={id.toString()}
      align="center"
      sx={{
        border: "solid",
        height: "70px",
        width: "70px",
        padding: "0px",
        cursor: !!player ? "curser" : "pointer",
      }}
      onClick={(e) => {
        if (!player) {
          setValues(id);
          console.log(e.currentTarget.id);
        }
      }}
    >
      <FiberManualRecordIcon sx={{ fontSize: 50, color: getColor(player) }} />
    </TableCell>
  );
}
