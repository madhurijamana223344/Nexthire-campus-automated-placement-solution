import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role: "admin"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed ❌");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data.user));

      alert("Admin Login Successful ✅");
      navigate("/admin");

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <div className="login-left">
        <img
          src="https://www.rerecruitment.com/app/uploads/2024/04/iStock-1466985705.jpg"
          alt="login"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <div className="login-card">

          <h2>Admin Login</h2>

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

export default AdminLogin;