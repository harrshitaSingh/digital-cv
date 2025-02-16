import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CustomInput from '../../../../Components/CustomInput';
import { ResumeContext } from '../../../../Context/ResumeContext/index,';

function ContactForm({ resumeId }) {
    const { resumes, updateResume } = useContext(ResumeContext)
    const [emailContact, setEmailContact] = useState({
        email: '',
    })
    const [phnNumber, setPhnNumber] = useState({
        phnNumber: ''
    })

    useEffect(() => {
        if (resumes && resumes.length > 0) {
            const selectedContactResume = resumes.find(resume => resume.id === resumeId);
            if (selectedContactResume) {
                const email = selectedContactResume.email;
                const phoneNumber = selectedContactResume.phnNumber;


                console.log(email, phoneNumber, "Contact details");

                setEmailContact({ email: email || '' });
                setPhnNumber({ phnNumber: phoneNumber || '' });
            }
        }
    }, [resumes, resumeId]);

    const handleContactEmail = (field, value) => {
        setEmailContact(prevState => ({
            ...prevState,
            [field]: value
        }))
        updateResume(resumeId, 'email', value)
    }

    const handleContactNumber = (field, value) => {
        setPhnNumber(prevState => ({
            ...prevState,
            [field]: value
        }))
        updateResume(resumeId, 'phnNumber', value)
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
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2, textAlign: "center", color: "#4b2354" }}
          >
            Add Contact
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomInput
              label="Email"
              variant="outlines"
              required
              currentValue={emailContact.email}
              updateValue={(value) => handleContactEmail("email", value)}
              inputType="email"
            />
          </Grid>

          <Grid item xs={6}>
            <CustomInput
              label="Phone Number"
              currentValue={phnNumber.phnNumber}
              updateValue={(value) => handleContactNumber("phnNumber", value)}
              maxLength={10}
              required
            />
          </Grid>
        </Grid>
      </Box>
    );
}

export default ContactForm;
