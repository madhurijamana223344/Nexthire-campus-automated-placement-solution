import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // ❌ Error from backend
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SUCCESS
      localStorage.setItem("student", JSON.stringify(data.user));

      navigate("/profile");

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <img
        src="https://img.freepik.com/premium-photo/female-indian-student-working-laptop_1239886-2352.jpg?semt=ais_hybrid&w=740&q=80"
        alt="student"
        className="side-img"
      />

      {/* RIGHT FORM */}
      <div className="box">
        <div className="login-card">
          <h2>Student Login</h2>

          {error && <p className="error">{error}</p>}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      </div>

    </div>
  );
}

export default StudentLogin;