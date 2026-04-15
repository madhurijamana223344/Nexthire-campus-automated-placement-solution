import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Navbar */}
      <div className="home-navbar">
        <h2 className="logo">NextHire: Automated Placement Solution</h2>
      </div>

      {/* Hero Section */}
      <div className="hero">

        {/* LEFT CONTENT */}
        <div className="hero-text">
          <h3>Welcome to</h3>
          <h1>NextHire</h1>
          <p>
            Your Gateway to Smart Campus Placements.<br />
            Connect with top companies and land your dream job.
          </p>

          <button onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_incoming&w=740&q=80"
            alt="placement"
          />
        </div>

      </div>
    </div>
  );
}

export default Home;
