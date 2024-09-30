import React from "react";
import { Drawer, Box, Typography, Divider } from "@mui/material";
import SidebarContent from "../SidebarContent";

const drawerWidth = 240;

const Sidebar = ({ selectedSection, setSelectedSection, handleModal, output }) => {

    const getResumeName = localStorage.getItem('newResumeName')
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "#4b2354",
              bgcolor: "#e09a9a8b",
              p: "20px",
              textTransform: "uppercase",
            }}
          >
            {getResumeName}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ textAlign: "center", mt: "20px" }}>
          <SidebarContent
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            output={output}
            handleModal={handleModal}
          />
        </Box>
      </Drawer>
    );
};

export default Sidebar;
