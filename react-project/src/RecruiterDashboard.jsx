import { useEffect, useState } from "react";
import API_BASE from "./api";


function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [count, setCount] = useState(0);

  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      let data = [];

      // ✅ TRY recruiter-specific API
      if (recruiter && recruiter._id) {
        const res = await fetch(
          `${API_BASE}/applications/recruiter/${recruiter._id}`
        );
        data = await res.json();
      }

      // 🔥 FALLBACK → if empty, load ALL applications
      if (!data || data.length === 0) {
        const res = await fetch(`${API_BASE}/applications`);
        data = await res.json();
      }

      console.log("FINAL DATA:", data);

      setApplications(data);
      setCount(data.length); // ✅ COUNT

    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    fetchApplications();
  };

  return (
   <div className="recruiter-container">
      <h2>Applicants ({count})</h2>

      {applications.length === 0 && <p>No applicants ❌</p>}
<div className="recruiter-grid">
      {applications.map((app) => (
        <div className="recruiter-card" key={app._id}>
          <h3>{app.jobTitle}</h3>
          <p>{app.company}</p>

          <p>Name: {app.name}</p>
          <p>Email: {app.email}</p>
          <p>Mobile: {app.mobile}</p>
          <p>College: {app.college}</p>

          <p>Status: {app.status}</p>

          <button onClick={() => updateStatus(app._id, "Accepted")}>
            Accept
          </button>

          <button onClick={() => updateStatus(app._id, "Rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default RecruiterDashboard;