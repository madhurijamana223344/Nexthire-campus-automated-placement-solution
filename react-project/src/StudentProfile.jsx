import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    education: "",
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // INPUT HANDLER
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // FILE HANDLER
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setErrors({ file: "Only PDF allowed" });
      return;
    }

    setErrors({ ...errors, file: "" });
    setProfile({ ...profile, resume: file });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!profile.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    if (!profile.education.trim()) {
      newErrors.education = "Education is required";
    }

    if (!profile.resume) {
      newErrors.file = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ BACKEND CONNECTED SAVE (FIXED)
const save = async () => {
  if (!validate()) return;

  try {
    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("skills", profile.skills);
    formData.append("education", profile.education);
    formData.append("email", "student@gmail.com"); // later dynamic
    formData.append("resume", profile.resume);

    const res = await fetch("http://localhost:5000/api/profile", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Profile saved ✅");

    // ✅ redirect immediately
    navigate("/jobs");

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
};
  return (
    <div className="container">

      <img
        src="https://t4.ftcdn.net/jpg/03/15/80/09/360_F_315800964_77dsFWNJflY7wvlnE1C5SNpt0DC2h43e.jpg"
        className="banner"
        alt="profile"
      />

      <h2>Student Profile</h2>

      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        name="name"
        value={profile.name}
        placeholder="Enter your full name"
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        name="skills"
        value={profile.skills}
        placeholder="Enter your skills (Java, React...)"
        onChange={handleChange}
      />
      {errors.skills && <p style={{ color: "red" }}>{errors.skills}</p>}

      <input
        name="education"
        value={profile.education}
        placeholder="Enter your education (B.Tech, MCA...)"
        onChange={handleChange}
      />
      {errors.education && <p style={{ color: "red" }}>{errors.education}</p>}

      <input type="file" onChange={handleFileChange} />
      {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}

      <button onClick={save}>Save Profile</button>

    </div>
  );
}

export default StudentProfile;