import React, { useState } from "react";
import CustomAvatar from "../../../../Components/CustomAvatar";
import { useNavigate, Link } from "react-router-dom";
import { Select, MenuItem, IconButton } from "@mui/material";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

const UserComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectOption, setSelectOption] = useState("");

  const dropDown = [
    { label: "Resumes", value: "/yourProj" },
    { label: "Settings", value: "/settings" },
    { label: "Help", value: "/help" },
  ];

    const navigate = useNavigate();

  const handleAvatarClick = () => {
    setShowDropdown((prev) => !prev); // Toggle the dropdown visibility
  };

const handleDropdownChange = (event) => {
  const newValue = event.target.value; 
  setSelectOption(newValue);
  navigate(newValue); 
  setShowDropdown(false); 
};

  return (
    <div
      className="userDetails"
      style={{ display: "flex", alignItems: "center", gap: 8 }}
    >
      <CustomAvatar size={50} fontSize={20} onClick={handleAvatarClick} />

      {showDropdown && (
        <Select
          value={selectOption}
          onChange={handleDropdownChange}
          open={showDropdown}
          onClose={() => setShowDropdown(false)}
          disableUnderline
          style={{
            display: "block",
            position: "absolute",
            top: "15px",
            right: "50px",
            border: "none",
            padding: 0,
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 120,
              },
            },
          }}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".MuiSelect-icon": {
              display: "none",
            },
          }}
        >
          {dropDown.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}

      <Link to="/">
        <IconButton
          sx={{
            backgroundColor: "transparent",
            border: "none",
            color: "#4b2354",
            cursor: "pointer",
            marginTop: "1px",
          }}
        >
          <PowerSettingsNew />
        </IconButton>
      </Link>
    </div>
  );
};

export default UserComponent;
