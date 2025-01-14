import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import EmailVerify from "./Pages/EmailVerificationPage";
import ExistingProj from "./Pages/ExistingProjectPage";
import SettingsPage from "./Pages/SettingsPage";
import UserContext from "./Context/UserContext";
import AdminPage from "./Pages/AdminPage";
import GoogleFormPage from "./Pages/HelpPage";
import ResumeProvider from "./Context/ResumeContext/index,";
import DetailPage from "./Pages/Dashboard";
import ReviewPage from "./Pages/ReviewPage";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UserContext>
              <LoginPage />
            </UserContext>
          }
        ></Route>
        <Route path="/adminPage" element={<AdminPage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/emailVerify" element={<EmailVerify />}></Route>
        <Route
          path="/addDetails"
          element={
            <ResumeProvider>
              <DetailPage />
            </ResumeProvider>
          }
        ></Route>

        <Route
          path="/yourProj"
          element={
            <ResumeProvider>
              <ExistingProj />
            </ResumeProvider>
          }
        ></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/help" element={<GoogleFormPage />}></Route>
        <Route path="/review" element={<ReviewPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
