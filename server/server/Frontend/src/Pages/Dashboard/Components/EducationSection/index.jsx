import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CustomInput from '../../../../Components/CustomInput';
import CustomButton from '../../../../Components/CustomButton';
import Add from '@mui/icons-material/Add';
import { ResumeContext } from '../../../../Context/ResumeContext/index,';

function EducationForm({ resumeId }) {
    const { resumes, updateResume } = useContext(ResumeContext);
    const [educationForms, setEducationForms] = useState([{
        instituteName: '',
        percentage: '',
        location: '',
        startEducationDate: '',
        endEducationDate: ''
    }]);

    useEffect(() => {
        if (resumes && resumes.length > 0) {
            const selectedResume = resumes.find(resume => resume.id === resumeId);

            if (selectedResume && selectedResume.education.length > 0) {
                const updatedEducationForms = selectedResume.education.map(edu => ({
                    instituteName: edu.institution || '',
                    percentage: edu.percentage || '',
                    location: edu.location || '',
                    startEducationDate: edu.startDate || '',
                    endEducationDate: edu.endDate || ''
                }));
                setEducationForms(updatedEducationForms);
            }
        }
    }, [resumes, resumeId]);

    const handleInputChange = (index, field, value) => {
        const updatedForms = educationForms.map((form, i) =>
            i === index ? { ...form, [field]: value } : form
        );
        setEducationForms(updatedForms);
        updateResume(resumeId, 'education', updatedForms);
    };

    const handleAddForm = () => {
        setEducationForms([...educationForms, {
            instituteName: '',
            percentage: '',
            location: '',
            startEducationDate: '',
            endEducationDate: ''
        }]);
    };

    if (!resumes) {
        return <div>Loading...</div>;
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
              Add Education
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
            updateClick={handleAddForm}
          />
        </Box>

        {educationForms.map((education, index) => (
          <Grid container spacing={2} sx={{ mb: 10 }} key={index}>
            <Grid item xs={12}>
              <CustomInput
                label="Institute Name"
                currentValue={education.instituteName}
                updateValue={(value) =>
                  handleInputChange(index, "instituteName", value)
                }
                required
                inputType="text"
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                label="Percentage"
                currentValue={education.percentage}
                updateValue={(value) =>
                  handleInputChange(index, "percentage", value)
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                label="Location"
                currentValue={education.location}
                updateValue={(value) =>
                  handleInputChange(index, "location", value)
                }
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="Start Date"
                currentValue={education.startEducationDate}
                updateValue={(value) =>
                  handleInputChange(index, "startEducationDate", value)
                }
                date={{ shrink: true }}
                required
                inputType="date"
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="End Date"
                currentValue={education.endEducationDate}
                updateValue={(value) =>
                  handleInputChange(index, "endEducationDate", value)
                }
                date={{ shrink: true }}
                required
                inputType="date"
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    );
}

export default EducationForm;
