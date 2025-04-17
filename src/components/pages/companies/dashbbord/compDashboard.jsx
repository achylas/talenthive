"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"
import "./Dashboard.css"

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [companyInfo, setCompanyInfo] = useState({})

  useEffect(() => {
    // Load company info
    const companyId = localStorage.getItem("companyId")
    if (companyId) {
      const companyData = JSON.parse(localStorage.getItem(`company_${companyId}`))
      setCompanyInfo(companyData || {})

      // Load jobs
      const jobsData = JSON.parse(localStorage.getItem(`jobs_${companyId}`) || "[]")
      setJobs(jobsData)
    }
  }, [])

  const deleteJob = (jobId) => {
    const companyId = localStorage.getItem("companyId")
    const updatedJobs = jobs.filter((job) => job.id !== jobId)
    setJobs(updatedJobs)
    localStorage.setItem(`jobs_${companyId}`, JSON.stringify(updatedJobs))
  }

  return (
    <div className="dashboard">
      <Navigation />

      <div className="container">
        <div className="dashboard-header">
          <h1>Company Dashboard</h1>
          <Link to="/post-job" className="btn">
            Post New Job
          </Link>
        </div>

        <div className="company-info card">
          <h2>Company Profile</h2>
          <div className="company-details">
            <div className="company-logo">
              {companyInfo.logo ? (
                <img src={companyInfo.logo || "/placeholder.svg"} alt={companyInfo.companyName} />
              ) : (
                <div className="placeholder-logo">{companyInfo.companyName?.charAt(0)}</div>
              )}
            </div>
            <div className="company-data">
              <h3>{companyInfo.companyName}</h3>
              <p>
                <strong>Industry:</strong> {companyInfo.industry}
              </p>
              <p>
                <strong>Size:</strong> {companyInfo.companySize}
              </p>
              <p>
                <strong>Location:</strong> {companyInfo.location}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={companyInfo.website} target="_blank" rel="noopener noreferrer">
                  {companyInfo.website}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="jobs-section">
          <h2>Your Job Listings</h2>

          {jobs.length === 0 ? (
            <div className="no-jobs">
              <p>You haven't posted any jobs yet.</p>
              <Link to="/post-job" className="btn">
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="job-list">
              {jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-location">{job.location}</p>
                  <p className="job-type">{job.type}</p>
                  <p className="job-salary">${job.salary}</p>
                  <div className="job-description">{job.description.substring(0, 100)}...</div>

                  <div className="job-actions">
                    <Link to={`/applicants/${job.id}`} className="btn btn-secondary">
                      View Applicants ({job.applicants?.length || 0})
                    </Link>
                    <button onClick={() => deleteJob(job.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
