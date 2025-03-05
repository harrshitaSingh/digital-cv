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
  const { userState, setUserState, setAdminState } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  if (!email || !password) {
    alert("Details must be filled out");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data); // Debugging

    if (response.ok) {
      setUserState(data.user);
      localStorage.setItem("token", data.user.token); // Store the token correctly
      navigate("/yourProj");
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Failed to login. Please try again.");
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
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#4b2354",
              m: 3,
              textAlign: "center",
            }}
          >
            LOG IN
          </Typography>{" "}
          <form className="loginForm" onSubmit={handleLogin}>
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
                  backgroundColor: "#4b2354",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
                btnText="Submit"
                updateClick={(e) => handleLogin(e)}
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
