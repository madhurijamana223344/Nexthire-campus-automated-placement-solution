import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

function RecruiterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      setError("Please enter email & password");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role: "recruiter"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed ❌");
        return;
      }

      localStorage.setItem("recruiter", JSON.stringify(data.user));

      alert("Recruiter Login Successful ✅");
      navigate("/recruiter-dashboard");

    } catch (err) {
      setError("Server error ❌");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <div className="login-left">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/069/642/724/small/online-application-form-submission-on-laptop-for-job-hiring-recruitment-process-and-human-resources-management-photo.jpg"
          alt="recruiter"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <div className="login-card">

          <h2>Recruiter Login</h2>

          {error && <p className="error">{error}</p>}

          <label>Email</label>
          <input
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>

        </div>
      </div>

    </div>
  );
}

export default RecruiterLogin;