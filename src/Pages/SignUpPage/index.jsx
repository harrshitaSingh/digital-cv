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

  const handleLogin = (e) => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Details must be filled out");
      // return;
    } else {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/");
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
        <img src="signUp.jpeg" alt="login" className="photo" />
        <div className="signUpBox">
          <h1>Sign Up</h1>
          <form className="signUpForm">
            <div className="inputGrp">
              <CustomInput
                inputType="text"
                label="Enter your name"
                currentValue={name}
                updateValue={setName}
              ></CustomInput>
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="email"
                label="Enter your email"
                currentValue={email}
                updateValue={setEmail}
              ></CustomInput>
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="password"
                label="New password"
                currentValue={password}
                updateValue={setPassword}
              ></CustomInput>
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="password"
                label="Confirm password"
                currentValue={confirmPassword}
                updateValue={setConfirmPassword}
              ></CustomInput>
            </div>
            <CustomButton
              btnStyles={{
                backgroundColor: "#b53f6c",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              btnText="Create Account"
              updateClick={handleLogin}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
