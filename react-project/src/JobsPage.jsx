import { useState, useEffect } from "react";

function JobsPage() {
  const [jobsData, setJobsData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    branch: "",
    resume: ""
  });

  // ✅ STATIC JOBS
  const staticJobs = [
    {
      title: "Software Engineer",
      company: "Google",
      desc: "Develop applications",
      eligibility: "B.Tech CSE",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg"
    },
    {
      title: "Web Developer",
      company: "Amazon",
      desc: "Frontend + Backend",
      eligibility: "Any Degree",
      img: "https://www.logisticsmiddleeast.com/cloud/2021/11/04/L2aCmYvS-amazon1-1200x675.jpg"
    },
    {
      title: "Data Analyst",
      company: "Infosys",
      desc: "Analyze business data",
      eligibility: "B.Tech / MCA",
      img: "https://media.newindianexpress.com/newindianexpress%2F2024-09-02%2Fws3vtmtl%2FInfosys%20issues.jpg"
    },
    {
      title: "Frontend Developer",
      company: "TCS",
      desc: "Build UI using React",
      eligibility: "B.Tech IT",
      img: "https://thumbs.dreamstime.com/b/tata-consultancy-services-tcs-sign-outside-glass-skyscraper-software-company-locates-its-technology-hyderabad-india-392047591.jpg"
    },
    {
      title: "Backend Developer",
      company: "Wipro",
      desc: "Work on Node.js and APIs",
      eligibility: "B.Tech CSE",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivy9DN7RaJsb2uonIrFW4VBIJE51Y7LaRNR3p-AKk4i3Nj3KqcbtaDC1LGIJ4-R7uhbJNe1Q93KEMFB81nPy7spJnWObDVzrAwv50woD_Y220-7oX7eOD3lL-MUOXYwJ1fL4E39v9zTbS2FZtMWFbLH-UFJw809xEI8AdRN5Z6l7RqE59Hf__diu5-uMo/s16000-rw/1000075467.jpg"
    },
    {
      title: "Full Stack Developer",
      company: "Accenture",
      desc: "Develop full stack applications",
      eligibility: "B.Tech / MCA",
      img: "https://t4.ftcdn.net/jpg/04/80/77/11/360_F_480771170_HkrtPlI4bPRPPveeewpjSidUUb32dEUu.jpg"
    },
    {
      title: "Cloud Engineer",
      company: "Amazon",
      desc: "Manage cloud infrastructure",
      eligibility: "B.Tech CSE",
      img: "https://apacnewsnetwork.com/wp-content/uploads/2021/09/AWS-1.jpg"
    },
    {
      title: "AI/ML Engineer",
      company: "Microsoft",
      desc: "Build machine learning models",
      eligibility: "B.Tech AI/DS",
      img: "https://media.istockphoto.com/id/1310441327/photo/microsoft-france-headquarters-entrance-in-issy-les-moulineaux-near-paris.jpg?s=612x612&w=0&k=20&c=w4df4OwilAGtPb01aXv910ND85E9Vh0I8qZ4CuRbFqI="
    },
    {
      title: "Cyber Security Analyst",
      company: "IBM",
      desc: "Ensure system security",
      eligibility: "B.Tech IT",
      img: "https://www.shutterstock.com/image-photo/cyberjaya-malaysia-january-29-2016-260nw-368761736.jpg"
    },
    {
      title: "UI/UX Designer",
      company: "Adobe",
      desc: "Design user-friendly interfaces",
      eligibility: "Any Degree",
      img: "https://st.depositphotos.com/16418564/53567/i/450/depositphotos_535675312-stock-photo-san-jose-usa-october-2021.jpg"
    }
  ];

  // ✅ LOAD JOBS
   useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();

      const cleaned = [...staticJobs, ...data].map(job => ({
        ...job,
        img: job.img?.trim() || null
      }));

      setJobsData(cleaned);

    } catch (err) {
      setJobsData(staticJobs);
    }
  };

  const deleteJob = async (job, index) => {
    if (job._id) {
      await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: "DELETE"
      });
      fetchJobs();
    } else {
      const updated = jobsData.filter((_, i) => i !== index);
      setJobsData(updated);
    }
  };

  const openForm = (job) => {
    setSelectedJob(job);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, resume: file ? file.name : "" });
  };

  // 🔥 FIXED APPLY FUNCTION
  const submitApplication = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          college: form.college,
          branch: form.branch,
          resume: form.resume,

          jobTitle: selectedJob.title,
          company: selectedJob.company,

          // 🔥 IMPORTANT FIX
          recruiterId: selectedJob.recruiterId,

          status: "Applied"
        })
      });

      alert("Application Submitted ✅");

      setSelectedJob(null);
      setForm({
        name: "",
        email: "",
        mobile: "",
        college: "",
        branch: "",
        resume: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Jobs</h2>

      <input
        type="text"
        placeholder="Search by job title..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="jobs-grid">
        {jobsData
          .filter((job) =>
            job.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((job, i) => (
            <div className="job-card" key={i}>
              <img
                src={
                  job.img?.startsWith("http")
                    ? job.img
                    : `http://localhost:5000/uploads/${job.img}`
                }
                alt="job"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.desc}</p>
              <p>{job.eligibility}</p>

              <button onClick={() => openForm(job)}>Apply</button>

              <button onClick={() => deleteJob(job, i)}>
                Delete
              </button>
            </div>
          ))}
      </div>

      {selectedJob && (
        <div className="popup">
          <div className="popup-content">
            <h3>Apply for {selectedJob.title}</h3>

            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="mobile" placeholder="Mobile" onChange={handleChange} />
            <input name="college" placeholder="College" onChange={handleChange} />
            <input name="branch" placeholder="Branch" onChange={handleChange} />

            <input type="file" onChange={handleFile} />

            <button onClick={submitApplication}>Submit</button>
            <button onClick={() => setSelectedJob(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsPage;