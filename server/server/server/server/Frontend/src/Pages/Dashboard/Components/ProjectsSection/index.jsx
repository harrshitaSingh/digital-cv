import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import CustomInput from "../../../../Components/CustomInput";
import { ResumeContext } from "../../../../Context/ResumeContext/index,";
import CustomButton from "../../../../Components/CustomButton";
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function ProjectForm({ resumeId }) {
  const { resumes, updateResume } = useContext(ResumeContext);

  const [projectName, setProjectName] = useState([
    {
      title: "",
      description: "",
      technologies: "",
      link: "",
    },
  ]);

  useEffect(() => {
    if (resumes && resumes.length > 0) {
      const selectedProj = resumes.find((resume) => resume.id === resumeId);

      if (selectedProj && selectedProj.projects.length > 0) {
        const updatedProject = selectedProj.projects.map((proj) => ({
          title: proj.title || "",
          description: proj.description || "",
          technologies: proj.technologies || "",
          link: proj.link || "",
        }));
        setProjectName(updatedProject);
      }
    }
  }, [resumes, resumeId]);

  const handleProj = (index, field, value) => {
    const updatedProjectName = [projectName].map((form, i) =>
      i === index ? { ...form, [field]: value } : form
    );
    setProjectName(updatedProjectName);
    updateResume(resumeId, "project", updatedProjectName);
  };

  const handleProjectAdd = () => {
    setProjectName([
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ]);
  };

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
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: "center", color: "#4b2354" }}
        >
          Add Projects
        </Typography>
        <CustomButton
          btnText={<Add />}
          btnStyles={{
            backgroundColor: "#4b2354",
            border: "none",
            color: "white",
            width: "50px",
            cursor: "pointer",
          }}
          updateClick={handleProjectAdd}
        />
      </Box>

      {projectName.map((projects, index) => (
        <Grid container spacing={2} sx={{ mb: 10 }} key={index}>
          {/* <CustomButton btnText={<DeleteIcon/>} btnStyles={{ backgroundColor: '#4b2354', border: 'none', color: 'white', width: '50px', cursor: 'pointer',  }} updateClick={handleProjectAdd} /> */}

          <Grid item xs={12}>
            <CustomInput
              label="Project Name"
              inputType="text"
              currentValue={projects.title}
              updateValue={(value) => handleProj(index, "title", value)}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="Technologies"
              inputType="text"
              currentValue={projects.technologies}
              updateValue={(value) => handleProj(index, "title", value)}
            />
          </Grid>

          {/* <Grid item xs={6}>
                    <CustomInput label="Start Date" currentValue={startProjDate} updateValue={(value) => handleProj('title', value)} date={{ shrink: true }} required inputType="date" />
                </Grid>

                <Grid item xs={6}>
                    <CustomInput label="End Date" currentValue={endProjDate} updateValue={(value) => handleProj('title', value)} date={{ shrink: true }} required inputType="date" />
                </Grid> */}

          <Grid item xs={12}>
            <CustomInput
              fullWidth
              label="Description"
              variant="outlined"
              currentValue={projects.description}
              updateValue={(value) => handleProj(index, "description", value)}
              multiline
              maxRows={4}
              maxLength={200}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Add Link" variant="outlined" required />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default ProjectForm;
