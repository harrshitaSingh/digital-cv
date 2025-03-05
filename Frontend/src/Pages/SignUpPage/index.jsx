import React, { useState } from "react";
import "./styled.css";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

const handleSignUp = async (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  if (!name || !email || !password || !confirmPassword) {
    alert('All fields must be filled out');
    return;
  }
  
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully!");
      navigate("/");
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Failed to create an account. Please try again.");
  }
};


  return (
    <div
      className="signUp"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: "bold",
          fontSize: "100px",
          color: "#4b2354",
          textAlign: "center",
        }}
      >
        DIGITAL RESUME
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <img src="signUp.jpeg" alt="signup" className="photo" />
        <div className="signUpBox">
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#4b2354", m: 3 }}
          >
            SIGN UP
          </Typography>
          <form className="signUpForm" onSubmit={handleSignUp}>
            <div className="inputGrp">
              <CustomInput
                inputType="text"
                label="Enter your name"
                currentValue={name}
                updateValue={setName}
              />
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="email"
                label="Enter your email"
                currentValue={email}
                updateValue={setEmail}
              />
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="password"
                label="New password"
                currentValue={password}
                updateValue={setPassword}
              />
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="password"
                label="Confirm password"
                currentValue={confirmPassword}
                updateValue={setConfirmPassword}
              />
            </div>
            <CustomButton
              btnStyles={{
                backgroundColor: "#4b2354",
                border: "none",
                color: "white",
                cursor: "pointer",
                margin: 4,
              }}
              btnText="Create Account"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
