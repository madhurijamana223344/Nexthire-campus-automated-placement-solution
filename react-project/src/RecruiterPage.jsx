import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterPage() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    desc: "",
    eligibility: ""
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // ✅ AUTH CHECK (ONLY CHECK, NO formData here)
  useEffect(() => {
  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  if (!recruiter) {
    alert("Please login first ❌");
    navigate("/recruiter-login");
  }
}, [navigate]);
  

  // INPUT
  const handle = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // FILE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ ADD JOB
  const handleSubmit = async () => {
    if (!job.title || !job.company || !job.desc || !job.eligibility || !file) {
      alert("All fields + image required ❌");
      return;
    }

    try {
      const recruiter = JSON.parse(localStorage.getItem("recruiter"));

      // 🔥 CREATE FORM DATA HERE ONLY
      const formData = new FormData();

      formData.append("title", job.title);
      formData.append("company", job.company);
      formData.append("desc", job.desc);
      formData.append("eligibility", job.eligibility);
      formData.append("img", file);

      // 🔥 IMPORTANT FIX
      formData.append("recruiterId", recruiter._id);

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      alert("Job Added with Image ✅");

      setJob({
        title: "",
        company: "",
        desc: "",
        eligibility: ""
      });

      setFile(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Recruiter - Add Job</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input name="title" placeholder="Job Title" value={job.title} onChange={handle} />
      <input name="company" placeholder="Company Name" value={job.company} onChange={handle} />
      <input name="desc" placeholder="Job Description" value={job.desc} onChange={handle} />
      <input name="eligibility" placeholder="Eligibility" value={job.eligibility} onChange={handle} />

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleSubmit}>Add Job</button>
    </div>
  );
}

export default RecruiterPage;