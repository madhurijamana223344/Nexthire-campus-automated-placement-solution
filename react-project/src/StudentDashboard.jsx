import { useEffect, useState } from "react";
import API_BASE from "./api";


function StudentDashboard() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      const data = await res.json();
      setAppliedJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE
  const deleteApplication = async (id) => {
    try {
      await fetch(`${API_BASE}/applications/${id}`, {
        method: "DELETE"
      });

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      <h2 style={{ textAlign: "center" }}>My Applications</h2>

      {appliedJobs.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No applications found
        </p>
      )}

      <div className="applications-grid">
        {appliedJobs.map((job) => (
          <div className="card" key={job._id}>
            <h3>{job.jobTitle}</h3>
            <p>{job.company}</p>
            <p>Status: {job.status}</p>

            <button onClick={() => setSelectedApp(job)}>
              👁️ View
            </button>

            <button onClick={() => deleteApplication(job._id)}>
              ❌ Delete
            </button>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedApp && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedApp.jobTitle}</h3>

            <p><b>Company:</b> {selectedApp.company}</p>
            <p><b>Name:</b> {selectedApp.name}</p>
            <p><b>Email:</b> {selectedApp.email}</p>
            <p><b>Mobile:</b> {selectedApp.mobile}</p>
            <p><b>College:</b> {selectedApp.college}</p>
            <p><b>Branch:</b> {selectedApp.branch}</p>
            <p><b>Resume:</b> {selectedApp.resume}</p>
            <p><b>Status:</b> {selectedApp.status}</p>

            <button onClick={() => setSelectedApp(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;