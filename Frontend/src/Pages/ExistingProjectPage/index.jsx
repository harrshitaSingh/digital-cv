import React, { useContext, useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../Components/CustomInput";
import { ResumeContext } from "../../Context/ResumeContext/index,";
import Add from "@mui/icons-material/Add";
import UserComponent from "../Dashboard/Components/UserComponent";
/**
 * ExistingProj component
 * @component
 * @description This component represents a dashboard page to manage existing projects and add new resumes.
 */
function ExistingProj() {
  const { resumes, setResumes } = useContext(ResumeContext); // Destructure setResumes
  const [newResume, setNewResume] = useState({ name: "" });
  const [addModal, setAddModal] = useState(false);
  const navigate = useNavigate();

  const handleClickOFModal = () => {
    setAddModal(!addModal);
  };

  /**
   * Handle adding a new resume.
   */
  const handleAdd = () => {
    const newId = resumes.length ? resumes[resumes.length - 1].id + 1 : 1;
    const newResumeEntry = {
      id: newId,
      name: newResume.name,
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      github: "",
      linkedin: "",
    };

    setResumes((prevResumes) => [...prevResumes, newResumeEntry]);

    localStorage.setItem("newResumeName", newResume.name);

    setAddModal(false);
    setNewResume({ name: "" });
    navigate("/addDetails");
  };

  return (
    <Box sx={{ display: "flex" }}>
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
          <Typography variant="h4" sx={{ color: "#4b2354" }}>
            Resumes
          </Typography>
          <div className="userDetails">
            <UserComponent />
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Card
            sx={{
              width: 280,
              bgcolor: "#f5f5f5",
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActions>
                <CustomButton
                  btnStyles={{
                    backgroundColor: "#4b2354",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    width: "70px",
                    height: "70px",
                    fontSize: "4vmax",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  btnText={<Add sx={{ width: "60px", height: "60px" }} />}
                  updateClick={handleClickOFModal}
                />
              </CardActions>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  fontSize: "larger",
                  marginTop: "1vw",
                }}
                color="#4b2354"
              >
                ADD RESUME
              </Typography>
            </CardContent>
          </Card>

          {/* Cards for each resume */}
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              sx={{ maxWidth: 300, bgcolor: "#f5f5f5", minHeight: 400 }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "#4b2354", textAlign: "center" }}
                >
                  {resume.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Manage your existing projects or create a new one
                </Typography>
                <Typography variant="body2">
                  You can edit, view, or delete your existing projects from
                  here.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ color: "#4b2354" }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}

          {/* Modal for adding new resume */}
          {addModal && (
            <CustomModal isOpen={addModal} closeModal={handleClickOFModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomInput
                      label="Add Name to your Resume"
                      currentValue={newResume.name}
                      updateValue={(value) => setNewResume({ name: value })}
                      required
                      inputType="text"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CustomButton
                      btnText="ADD"
                      btnStyles={{
                        backgroundColor: "#4b2354",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                      }}
                      updateClick={handleAdd}
                    />{" "}
                    \
                  </Grid>
                </Grid>
              </Box>
            </CustomModal>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ExistingProj;
