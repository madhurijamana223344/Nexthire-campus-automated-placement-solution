
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./Home";
import Signup from "./Signup";

import StudentLogin from "./StudentLogin";
import StudentProfile from "./StudentProfile";
import Jobs from "./JobsPage";
import StudentDashboard from "./StudentDashboard";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

import Recruiter from "./RecruiterPage";
import RecruiterDashboard from "./RecruiterDashboard";
import RecruiterLogin from "./RecruiterLogin"; // ✅ NEW

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* SIGNUP */}
        <Route path="/signup" element={<Signup />} />

        {/* STUDENT */}
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* RECRUITER */}
        <Route path="/recruiter-login" element={<RecruiterLogin />} /> {/* ✅ NEW */}
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      </Routes>
    </>
  );
}

export default App;