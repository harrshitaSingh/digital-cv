import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React from "react";

const CustomSelect = ({
  currentValue,
  updateValue,
  selectStyle,
  options,
  select,
}) => {
  const handleValue = (e) => {
    const inputValue = e.target.value;
    updateValue(inputValue);
  };

  return (
    <FormControl fullWidth style={selectStyle}>
      <InputLabel
        sx={{
          color: "#4b2354",
          "&.Mui-focused": {
            color: "#4b2354",
          },
        }}
      >
        {select}
      </InputLabel>
      <Select
        value={currentValue}
        label={select}
        onChange={handleValue}
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#4b2354",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4b2354",
            borderWidth: "2px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4b2354",
            borderWidth: "2px",
          },
          "& .MuiSelect-select": {
            color: "black",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
