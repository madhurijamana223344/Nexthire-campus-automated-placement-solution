import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-section">
        <h1 className="main-title">NextHire</h1>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>

        <Link to="/studentlogin">Student Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/student-dashboard">My Applications</Link>

        <Link to="/admin-login">Admin Login</Link>
        <Link to="/admin">Admin Dashboard</Link>

        <Link to="/recruiter-login">Recruiter Login</Link> {/* ✅ NEW */}
        <Link to="/recruiter">Add Job</Link>
        <Link to="/recruiter-dashboard">Applicants</Link>
      </div>

    </nav>
  );
}

export default Navbar;