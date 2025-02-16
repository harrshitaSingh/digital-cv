import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CustomButton from "../../../../Components/CustomButton";

const SidebarContent = ({ selectedSection, setSelectedSection, output, handleModal }) => {
    return (
      <>
        {output.map((dtlSection) => (
          <Typography
            key={dtlSection}
            sx={{
              backgroundColor:
                selectedSection === dtlSection ? "#e09a9a8b" : "#f0f0f0",
              color: "#4b2354",
              padding: 2,
              margin: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "large",
              position: "relative",
            }}
          >
            <Box component="span">{dtlSection}</Box>
            <IconButton
              onClick={() => setSelectedSection(dtlSection)}
              aria-label={`Go to ${dtlSection}`}
              sx={{
                color:  "#4b2354",
                border: "none",
                position: "absolute",
                right: "1px",
                padding: 0,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "transparent",
                  color:  "black",
                },
                "&:active": {
                  backgroundColor: "transparent",
                  color:  "black",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <ArrowRightIcon />
            </IconButton>
          </Typography>
        ))}
        <CustomButton
          btnStyles={{
            color: "#fff",
            backgroundColor: "#4b2354",
            border: "none",
            marginTop: "20px",
            cursor: "pointer",
          }}
          variant="contained"
          btnText="Final Review"
          updateClick={handleModal}
        />
      </>
    );
};

export default SidebarContent;
