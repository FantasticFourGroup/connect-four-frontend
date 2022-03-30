import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Depth } from "./Models";

interface DepthSelectorProps {
  value: Depth;
  onChange: (newValue: Depth) => void;
}

export default function DepthSelector({ value, onChange }: DepthSelectorProps) {
  const handleChange = (event: SelectChangeEvent) =>
    onChange(Number(event.target.value) as Depth);

  return (
    <Box sx={{ width: "80px" }}>
      <FormControl fullWidth>
        <InputLabel id="depth-label">Depth</InputLabel>
        <Select
          labelId="depth-label"
          id="demo-simple-select"
          value={value.toString()}
          label="Depht"
          onChange={handleChange}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
