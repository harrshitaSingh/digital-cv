import React, { useContext, useState } from "react";
import "./styled.css";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import EducationForm from "./Components/EducationSection";
import ExperienceForm from "./Components/ExperienceSection";
import CertificationForm from "./Components/CertificationSection";
import ProjectForm from "./Components/ProjectsSection";
import UrlForm from "./Components/SocilaLinksSection";
import ContactForm from "./Components/ContactSection";
import CustomSelect from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { ResumeContext } from "../../Context/ResumeContext/index,";
import Sidebar from "./Components/Sidebar";
import UserComponent from "./Components/UserComponent";

const drawerWidth = 240;

/**
 * DetailPage component
 * @component
 * @description This component represents a detailed page with different sections like education, experience, etc. Users can interact with forms inside the modal or navigate through the sidebar.
 */
export default function DetailPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [openModalState, setOpenModalState] = useState(false);
  const [education, setEducation] = useState(" ");
  const [experience, setExperience] = useState(" ");
  const [projects, setProjects] = useState(" ");
  const [certifications, setCertifications] = useState(" ");
  const [contactEmail, setContactEmail] = useState(" ");
  const [contactNumber, setContactNumber] = useState(" ");
  const [link, setLink] = useState(" ");
  const { resumes } = useContext(ResumeContext);
  const [selectResume, setSelectResume] = useState("");

  const sideBarField = {
    Education: <EducationForm resumeId={1} />,
    Experience: <ExperienceForm resumeId={1} />,
    Certifications: <CertificationForm resumeId={1} />,
    Projects: <ProjectForm resumeId={1} />,
    Links: <UrlForm resumeId={1} />,
    Contact: <ContactForm resumeId={1} />,
  };

  const userNameFromLocal = localStorage.getItem("name");
  const output = [
    "Contact",
    "Experience",
    "Education",
    "Projects",
    "Certifications",
    "Links",
  ];

  const resumeDropdownOptions = resumes.map((resume) => ({
    label: resume.name,
    value: resume.id,
  }));

  const handleModal = () => {
    const selectedResume = resumes.find((resume) => resume.id === 1);
    if (selectedResume) {
      setContactEmail(selectedResume.email);
      setContactNumber(selectedResume.phnNumber);

      const firstEducation = selectedResume.education[0];
      const firstExperience = selectedResume.experience[0];
      const firstProject = selectedResume.projects[0];
      const firstCertification = selectedResume.certifications[0];

      setEducation(
        `${firstEducation.degree}, ${firstEducation.institution}, ${firstEducation.percentage}`
      );
      setExperience(
        `${firstExperience.jobTitle} at ${firstExperience.company}, ${firstExperience.years}`
      );
      setProjects(
        `${firstProject.title}: ${firstProject.description}, Technologies : ${firstProject.technologies}`
      );
      setCertifications(
        `${firstCertification.title}, ${firstCertification.institute}, ${firstCertification.year}`
      );
    }
    setOpenModalState(!openModalState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar section with search, avatar, and navigation */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#e09a9a8b",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl
            sx={{ m: 1, width: "50ch", display: "flex", alignItems: "center" }}
            variant="outlined"
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {/* CustomSelect with full width */}
              <Box sx={{ flexGrow: 1 }}>
                <CustomSelect
                  currentValue={selectResume}
                  updateValue={(value) => setSelectResume(value)}
                  selectStyle={{
                    width: "100%",
                    ".MuiOutlinedInput-notchedOutline": {
                      border: "#4b2354",
                    },
                  }}
                  options={resumeDropdownOptions}
                  select="Search Resume"
                />
              </Box>
            </Box>
          </FormControl>
          {/* User avatar with dropdown*/}
          <UserComponent />
        </Toolbar>
      </AppBar>

      {/* Left sidebar with section links */}
      <Sidebar
        output={output}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        handleModal={handleModal}
      />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          paddingTop: "64px",
          height: "calc(100%-2vw)",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        {/* Render selected form based on sidebar selection */}
        {sideBarField[selectedSection] ? (
          sideBarField[selectedSection]
        ) : (
          <Typography></Typography>
        )}

        {/* Modal content for final review */}
        {openModalState && (
          <CustomModal isOpen={openModalState} closeModal={handleModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 5,
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                    color: "#4b2354",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "36px",
                      fontWeight: "bold",
                    }}
                  >
                    {userNameFromLocal}
                  </Typography>
                </Grid>

                {/* Contact form inside the modal */}
                <Grid item xs={4}>
                  <CustomInput
                    label="Email"
                    currentValue={contactEmail}
                    updateValue={handleModal}
                    date={{ shrink: true }}
                    required
                    inputType="email"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomInput
                    label="Contact Number"
                    currentValue={contactNumber}
                    updateValue={handleModal}
                    date={{ shrink: true }}
                    required
                    inputType="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomInput
                    label="Links"
                    currentValue={link}
                    updateValue={handleModal}
                    date={{ shrink: true }}
                    required
                    inputType="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    label="Education"
                    currentValue={education}
                    updateValue={handleModal}
                    required
                    inputType="text"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    label="Experience"
                    currentValue={experience}
                    updateValue={handleModal}
                    maxRows={4}
                    multiline
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    label="Projects"
                    currentValue={projects}
                    updateValue={handleModal}
                    maxRows={4}
                    multiline
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    label="Certifications"
                    currentValue={certifications}
                    updateValue={handleModal}
                    date={{ shrink: true }}
                    maxRows={4}
                    multiline
                    required
                    inputType="text"
                  />
                </Grid>

                {/* Buttons for modal actions */}
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomButton
                    btnText="UPDATE"
                    btnStyles={{
                      backgroundColor: "#4b2354",
                      border: "none",
                      color: "white",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomButton
                    btnText="SAVE"
                    btnStyles={{
                      backgroundColor: "#4b2354",
                      border: "none",
                      color: "white",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </CustomModal>
        )}
      </Box>
    </Box>
  );
}
