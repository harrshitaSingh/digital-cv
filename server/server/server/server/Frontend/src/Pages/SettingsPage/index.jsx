import React from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  InputAdornment,
} from "@mui/material";
import CustomButton from "../../Components/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import CustomInput from "../../Components/CustomInput";
import CustomAvatar from "../../Components/CustomAvatar";
import UserComponent from "../Dashboard/Components/UserComponent";

function SettingsPage() {
  const updateProfileSection = [
    "Name",
    "Email",
    "Job Experience",
    "Experience Level",
  ];
  const updatePasswordSection = [
    "Old Password",
    "New Password",
    "Confirm Password",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#e09a9a8b",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {" "}
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{color:'#4b2354'}}>Settings</Typography>

          <div className="userDetails">
            <UserComponent />
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "100%",
            maxWidth: "800px",
            bgcolor: "#fff",
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <CustomAvatar />

          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography variant="h4" sx={{ color: "#4b2354" }}>
              PROFILE
            </Typography>
          </Box>

          {updateProfileSection.map((profileSection) => (
            <Box
              key={profileSection}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "600px",
                margin: "10px 0",
              }}
            >
              <CustomInput
                fullWidth
                label={profileSection}
                Adornment={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ))}

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <CustomButton
              btnStyles={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10vw",
                marginLeft: "auto",
                backgroundColor: "#4b2354",
                color: "white",
                border: "none",
              }}
              btnText="Update Profile"
            />
          </Box>

          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography variant="h4" sx={{ color: "#4b2354" }}>
              PASSWORD
            </Typography>
          </Box>

          {updatePasswordSection.map((passwordSection) => (
            <Box
              key={passwordSection}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "800px",
                margin: "10px 0",
              }}
            >
              <CustomInput
                label={passwordSection}
                Adornment={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ))}
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <CustomButton
              btnStyles={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10vw",
                marginLeft: "auto",
                backgroundColor: "#4b2354",
                color: "white",
                border: "none",
              }}
              btnText="Update Password"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SettingsPage;
