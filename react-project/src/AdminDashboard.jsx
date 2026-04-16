import { useEffect, useState } from "react";
import API_BASE from "./api";


function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchJobs();
  }, []);

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      const data = await res.json();

      setStudents(data.data || []);
    } catch (err) {
      setError("Failed to load students ❌");
    }
  };

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs`);
      const data = await res.json();

      setJobs(data || []);
    } catch (err) {
      setError("Failed to load jobs ❌");
    }
  };

  // ================= DELETE STUDENT =================
  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_BASE}/profile/${id}`, {
        method: "DELETE"
      });

      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // ================= DELETE JOB =================
  const deleteJob = async (id) => {
    try {
      await fetch(`${API_BASE}/jobs/${id}`, {
        method: "DELETE"
      });

      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // ================= FILTER =================
  const filteredStudents = students.filter(s =>
    (s.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredJobs = jobs.filter(j =>
    (j.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">

      <h2 className="title">Admin Dashboard</h2>

      {/* COUNT */}
      <div className="count-box">
        <p>👨‍🎓 Students: {students.length}</p>
        <p>💼 Jobs: {jobs.length}</p>
      </div>

      {/* SEARCH */}
      <input
        className="search-bar"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="dashboard-flex">

        {/* ================= STUDENTS ================= */}
        <div className="panel student-panel">
          <h3>Students</h3>

          {filteredStudents.length === 0 ? (
            <p>No students</p>
          ) : (
            filteredStudents.map((s) => (
              <div className="card" key={s._id}>
                <p><b>Name:</b> {s.name}</p>
                <p><b>Skills:</b> {s.skills}</p>
                <p><b>Education:</b> {s.education}</p>

                {s.resume && (
                  <a
                    href={`/uploads/${s.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 Resume
                  </a>
                )}

                <button onClick={() => deleteStudent(s._id)}>
                  ❌ Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= JOBS ================= */}
        <div className="panel job-panel">
          <h3>Jobs</h3>

          {filteredJobs.length === 0 ? (
            <p>No jobs</p>
          ) : (
            filteredJobs.map((j) => (
              <div className="card" key={j._id}>
                <h4>{j.title}</h4>
                <p><b>Company:</b> {j.company}</p>
                <p>{j.desc}</p>

                {j.img && (
                  <img src={j.img} alt="job" />
                )}

                <button onClick={() => deleteJob(j._id)}>
                  ❌ Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;