import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 4) {
      newErrors.password = "Minimum 4 characters required";
    }

    if (!user.role) {
      newErrors.role = "Please select a role";
    }

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const signup = async () => {
  if (!validate()) return;

  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    // ❌ Error from backend (like duplicate email)
    if (!res.ok) {
      console.log("Backend Error:", data);
      setErrors({ email: data.message || "Signup failed" });
      return;
    }

    alert("Signup successful");

    // ✅ Redirect based on role
    if (user.role === "student") {
      navigate("/studentlogin");
    } else if (user.role === "recruiter") {
      navigate("/recruiter-login");
    } else {
      navigate("/admin-login");
    }

    // ✅ Clear form
    setUser({
      name: "",
      email: "",
      password: "",
      role: ""
    });

  } catch (err) {
    console.error(err);
    setErrors({ email: "Server not responding ❌" });
  }
};

    return (
  <div className="login-container">

    {/* LEFT SIDE IMAGE */}
    <img
      src="https://img.freepik.com/free-photo/sign-up-form-button-graphic-concept_53876-123684.jpg?semt=ais_incoming&w=740&q=80"
      className="side-img"
      alt="signup"
    />

    {/* RIGHT SIDE FORM */}
    <div className="box">

      {/* ✅ FORM SHOULD BE INSIDE BOX ONLY */}
      <form autoComplete="off">
        <div className="login-card">

          <h2>Sign Up</h2>

          {/* NAME */}
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={user.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          {/* ROLE */}
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <button type="button" onClick={signup}>
            Sign Up
          </button>

        </div>
      </form>

    </div>
  </div>
);
}

export default Signup;