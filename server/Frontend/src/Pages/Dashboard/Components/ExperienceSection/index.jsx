import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CustomInput from '../../../../Components/CustomInput';
import { ResumeContext } from '../../../../Context/ResumeContext/index,';
import CustomButton from '../../../../Components/CustomButton';
import Add from '@mui/icons-material/Add';

function ExperienceForm({ resumeId }) {

    const { resumes, updateResume } = useContext(ResumeContext)
    const [companyName, setCompanyName] = useState([{
        jobTitle: '',
        company: '',
        years: '',
        description: '',
        location: ''
    }])

    useEffect(() => {
        if (resumes && resumes.length > 0) {
            const selectedExp = resumes.find(resume => resume.id === resumeId)
            console.log(selectedExp)
            if (selectedExp && selectedExp.experience.length > 0) {
                const updatedExperienceForm = selectedExp.experience.map(exp => ({
                    jobTitle: exp.jobTitle || '',
                    company: exp.company || '',
                    years: exp.years || '',
                    description: exp.description || '',
                    location: exp.location || ''
                }))
                setCompanyName(updatedExperienceForm)
            }
        }
    }, [resumes, resumeId])


    const handelExperience = (index, field, value) => {
        const updatedFormEducation = companyName.map((form, i) => i === index ? { ...form, [field]: value } : form)
       setCompanyName(updateResume)
        updateResume(resumeId, 'experience', updatedFormEducation)
    }

    const handelExperienceForm = () => {
        setCompanyName([...companyName, {
            jobTitle: '',
            company: '',
            years: '',
            description: '',
            location: ''
        }])
    }

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
            Add Experience
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
            updateClick={handelExperienceForm}
          />
        </Box>

        {companyName.map((experience, index) => (
          <Grid container spacing={2} sx={{ mb: 10 }} key={index}>
            <Grid item xs={12}>
              <CustomInput
                label="Comapany Name"
                inputType="text"
                currentValue={experience.company}
                updateValue={(value) =>
                  handelExperience(index, "company", value)
                }
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="Title"
                inputType="text"
                currentValue={experience.jobTitle}
                updateValue={(value) =>
                  handelExperience(index, "jobTitle", value)
                }
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="Location"
                inputType="text"
                currentValue={experience.location}
                updateValue={(value) =>
                  handelExperience(index, "location", value)
                }
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="Start Date"
                currentValue={experience.years}
                updateValue={(value) => handelExperience(index, "years", value)}
                date={{ shrink: true }}
                required
                inputType="date"
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="End Date"
                currentValue={experience.years}
                updateValue={(value) => handelExperience(index, "years", value)}
                date={{ shrink: true }}
                required
                inputType="date"
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                fullWidth
                label="Description"
                variant="outlined"
                currentValue={experience.description}
                updateValue={(value) =>
                  handelExperience(index, "description", value)
                }
                multiline
                maxRows={4}
                maxLength={200}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    );
}

export default ExperienceForm;
