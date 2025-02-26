import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import CustomInput from '../../../../Components/CustomInput';
import CustomButton from '../../../../Components/CustomButton';
import Add from '@mui/icons-material/Add';
import { ResumeContext } from '../../../../Context/ResumeContext/index,';

function CertificationForm({ resumeId }) {
    const [certificateName, setCertificateName] = useState([{
        title: '',
        institution: '',
        startDate: '',
        endDate: '',
        description: ''
    }]);
    const { resumes, updateResume } = useContext(ResumeContext);

    useEffect(() => {
        if (resumes && resumes.length > 0) {
            const selectedResumeCertificate = resumes.find(resume => resume.id === resumeId);
            console.log(selectedResumeCertificate);

            if (selectedResumeCertificate && selectedResumeCertificate.certifications.length > 0) {
                const updatedCertificates = selectedResumeCertificate.certifications.map(certi => ({
                    title: certi.title || '',
                    institution: certi.institution || '',
                    startDate: certi.startDate || '',
                    endDate: certi.endDate || '',
                    description: certi.description || ''
                }));
                setCertificateName(updatedCertificates);
            }
        }
    }, [resumes, resumeId]);

    const handleCertificate = (index, field, value) => {
        const updateCertiForms = certificateName.map((form, i) =>
            i === index ? { ...form, [field]: value } : form
        );
        setCertificateName(updateCertiForms);

        updateResume(resumeId, 'certifications', updateCertiForms);
    };

    const handleFormBtn = () => {
        setCertificateName([...certificateName, {
            title: '',
            institution: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
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
            Add Certificates
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
            updateClick={handleFormBtn}
          />
        </Box>
        {certificateName.map((certificate, index) => (
          <Grid container spacing={2} sx={{ mb: 10 }} key={index}>
            <Grid item xs={12}>
              <CustomInput
                inputType="text"
                label="Certificate Name"
                currentValue={certificate.title}
                updateValue={(value) =>
                  handleCertificate(index, "title", value)
                }
                textInputStyles={{ width: "100%" }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="Start Date"
                inputType="date"
                currentValue={certificate.startDate}
                updateValue={(value) =>
                  handleCertificate(index, "startDate", value)
                }
                required
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                label="End Date"
                inputType="date"
                currentValue={certificate.endDate}
                updateValue={(value) =>
                  handleCertificate(index, "endDate", value)
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                fullWidth
                label="Description"
                currentValue={certificate.description}
                updateValue={(value) =>
                  handleCertificate(index, "description", value)
                }
                multiline
                maxRows={4}
                maxLength={200}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Link"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    );
}

export default CertificationForm;
