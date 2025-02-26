import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CustomInput from "../../../../Components/CustomInput";

function SocialUrls() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [portFolioUrl, setPortFolioUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");

  return (
    <Box
      sx={{
        width: "60%",
        margin: "0 auto",
        padding: "2rem",
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: "center", color: "#4b2354" }}
        >
          Add Links
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomInput
            label="Linkedin URL"
            inputType="text"
            currentValue={linkedinUrl}
            updateValue={setLinkedinUrl}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Github URL"
            inputType="text"
            currentValue={gitHubUrl}
            updateValue={setGitHubUrl}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Portfolio URL"
            inputType="text"
            currentValue={portFolioUrl}
            updateValue={setPortFolioUrl}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Other URL"
            inputType="text"
            currentValue={otherUrl}
            updateValue={setOtherUrl}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SocialUrls;
