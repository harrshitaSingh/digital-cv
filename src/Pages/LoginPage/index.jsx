import React, { useContext, useState } from "react";
import "./styled.css";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { UserContext } from "../../Context/UserContext";
import { Typography } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserState, setAdminState } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (email === "" || password === "") {
      alert("Details must be filled out");
      return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail === email && storedPassword === password) {
      if (email === "harshita@gmail.com" && password === "Harshita") {
        setAdminState("Admin Logged In");
        navigate("/adminPage");
      } else {
        setUserState("User Logged In");
        navigate("/yourProj");
      }
    } else {
      alert("User does not exist! Kindly create an account");
      return;
    }
  };

  return (
    <div
      className="login"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        backgroundColor: "#e09a9a3b",
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
          marginTop: "100px",
        }}
      >
        <img
          src="loginImg.jpg"
          alt="login"
          style={{ marginRight: "20px", width: "400px", height: "auto" }}
        />

        <div
          className="loginBox"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "30px",
            width: "400px",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Log In</h1>
          <form className="loginForm">
            <div className="inputGrp">
              <CustomInput
                inputType="email"
                currentValue={email}
                updateValue={setEmail}
                label="Enter your Email"
              />
            </div>
            <div className="inputGrp">
              <CustomInput
                inputType="password"
                label="Enter your password"
                currentValue={password}
                updateValue={setPassword}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CustomButton
                btnStyles={{
                  backgroundColor: "#b53f6c",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
                btnText="Submit"
                updateClick={handleLogin}
              />
              <Link to="/signUp">
                <CustomButton
                  btnStyles={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "black",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginTop: "10px",
                  }}
                  btnText="Create Account?"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
