"use client"
import "../companies/compdashbord.css"
import { useState } from "react"
import { Plus, Briefcase, Users, Eye, Edit, Trash2, Search, BarChart, Building } from "lucide-react"

export default function TalentHiveDashboard() {
  // Sample initial job listings
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120,000 - $150,000",
      posted: "2023-04-10",
      applicants: 24,
      status: "Active",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      experience: "3+ years",
      salary: "$110,000 - $130,000",
      posted: "2023-04-05",
      applicants: 18,
      status: "Active",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Contract",
      experience: "2+ years",
      salary: "$90,000 - $110,000",
      posted: "2023-04-01",
      applicants: 32,
      status: "Closed",
    },
  ])

  // State for form and UI
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    salary: "",
    description: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [editingJob, setEditingJob] = useState(null)
  const [showJobForm, setShowJobForm] = useState(false)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewJob((prev) => ({ ...prev, [name]: value }))
  }

  // Add new job
  const handleAddJob = (e) => {
    e.preventDefault()
    const currentDate = new Date().toISOString().split("T")[0]

    if (editingJob) {
      // Update existing job
      setJobs(jobs.map((job) => (job.id === editingJob.id ? { ...job, ...newJob, posted: job.posted } : job)))
      setEditingJob(null)
    } else {
      // Add new job
      const newJobEntry = {
        ...newJob,
        id: jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1,
        posted: currentDate,
        applicants: 0,
        status: "Active",
      }
      setJobs([...jobs, newJobEntry])
    }

    // Reset form
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      salary: "",
      description: "",
    })
    setShowJobForm(false)
  }

  // Edit job
  const handleEditJob = (job) => {
    setEditingJob(job)
    setNewJob({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description || "",
    })
    setShowJobForm(true)
    setActiveTab("add-job")
  }

  // Delete job
  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      setJobs(jobs.filter((job) => job.id !== id))
    }
  }

  // Toggle job status
  const toggleJobStatus = (id) => {
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, status: job.status === "Active" ? "Closed" : "Active" } : job)),
    )
  }

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Stats for dashboard
  const activeJobs = jobs.filter((job) => job.status === "Active").length
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0)
  const averageApplicantsPerJob = jobs.length > 0 ? Math.round(totalApplicants / jobs.length) : 0

  return (
    <div className="talenthive-dashboard">
      {/* Sidebar */}
      <aside className="comp-sidebar">
        <div className="comp-logo">
          <h1>TalentHive</h1>
        </div>
        <nav className="comp-nav-menu">
          <button
            className={`comp-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart size={20} />
            <span>Dashboard</span>
          </button>
          <button
            className={`comp-nav-item ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("jobs")
              setShowJobForm(false)
            }}
          >
            <Briefcase size={20} />
            <span>Job Listings</span>
          </button>
          <button
            className={`comp-nav-item ${activeTab === "add-job" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add-job")
              setShowJobForm(true)
              if (!editingJob) {
                setNewJob({
                  title: "",
                  department: "",
                  location: "",
                  type: "Full-time",
                  experience: "",
                  salary: "",
                  description: "",
                })
              }
            }}
          >
            <Plus size={20} />
            <span>Add New Job</span>
          </button>
        </nav>
        <div className="comp-company-info">
          <Building size={20} />
          <span>Your Company</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="comp-main-content">
        <header className="comp-header">
          <h2>
            {activeTab === "dashboard"
              ? "Dashboard Overview"
              : activeTab === "jobs"
                ? "Job Listings"
                : editingJob
                  ? "Edit Job Listing"
                  : "Add New Job"}
          </h2>
          <div className="comp-search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        <div className="comp-content-area">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="comp-dashboard-view">
              <div className="comp-stats-cards">
                <div className="comp-stat-card">
                  <div className="comp-stat-icon">
                    <Briefcase size={24} />
                  </div>
                  <div className="comp-stat-details">
                    <h3>Active Jobs</h3>
                    <p className="comp-stat-value">{activeJobs}</p>
                  </div>
                </div>
                <div className="comp-stat-card">
                  <div className="comp-stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="comp-stat-details">
                    <h3>Total Applicants</h3>
                    <p className="comp-stat-value">{totalApplicants}</p>
                  </div>
                </div>
                <div className="comp-stat-card">
                  <div className="comp-stat-icon">
                    <Eye size={24} />
                  </div>
                  <div className="comp-stat-details">
                    <h3>Avg. Applicants</h3>
                    <p className="comp-stat-value">{averageApplicantsPerJob}</p>
                  </div>
                </div>
              </div>

              <div className="comp-recent-jobs">
                <h3>Recent Job Listings</h3>
                <table className="comp-jobs-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Posted</th>
                      <th>Applicants</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>{job.posted}</td>
                        <td>{job.applicants}</td>
                        <td>
                          <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="view-all-btn" onClick={() => setActiveTab("jobs")}>
                  View All Jobs
                </button>
              </div>
            </div>
          )}

          {/* Jobs Listing View */}
          {activeTab === "jobs" && !showJobForm && (
            <div className="comp-jobs-view">
              <div className="comp-jobs-header">
                <h3>All Job Listings ({filteredJobs.length})</h3>
                <button
                  className="comp-add-job-btn"
                  onClick={() => {
                    setEditingJob(null)
                    setNewJob({
                      title: "",
                      department: "",
                      location: "",
                      type: "Full-time",
                      experience: "",
                      salary: "",
                      description: "",
                    })
                    setShowJobForm(true)
                    setActiveTab("add-job")
                  }}
                >
                  <Plus size={16} />
                  Add New Job
                </button>
              </div>

              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Posted</th>
                    <th>Applicants</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.department}</td>
                      <td>{job.location}</td>
                      <td>{job.type}</td>
                      <td>{job.posted}</td>
                      <td>{job.applicants}</td>
                      <td>
                        <button
                          className={`status-badge ${job.status.toLowerCase()}`}
                          onClick={() => toggleJobStatus(job.id)}
                        >
                          {job.status}
                        </button>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => handleEditJob(job)}>
                            <Edit size={16} />
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="no-jobs">
                  <p>No job listings found. Add your first job listing!</p>
                </div>
              )}
            </div>
          )}

          {/* Add/Edit Job Form */}
          {showJobForm && (
            <div className="comp-job-form-container">
              <form onSubmit={handleAddJob} className="job-form">
                <div className="comp-form-group">
                  <label htmlFor="title">Job Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div className="comp-form-row">
                  <div className="comp-form-group">
                    <label htmlFor="department">Department*</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={newJob.department}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Engineering"
                    />
                  </div>

                  <div className="comp-form-group">
                    <label htmlFor="location">Location*</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Remote, New York, NY"
                    />
                  </div>
                </div>

                <div className="comp-form-row">
                  <div className="comp-form-group">
                    <label htmlFor="type">Job Type*</label>
                    <select id="type" name="type" value={newJob.type} onChange={handleInputChange} required>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="comp-form-group">
                    <label htmlFor="experience">Experience*</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={newJob.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 3+ years"
                    />
                  </div>
                </div>

                <div className="comp-form-group">
                  <label htmlFor="salary">Salary Range</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. $80,000 - $100,000"
                  />
                </div>

                <div className="comp-form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Enter detailed job description..."
                  />
                </div>

                <div className="comp-form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowJobForm(false)
                      setEditingJob(null)
                      setActiveTab("jobs")
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingJob ? "Update Job" : "Add Job"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

    

    </div>
  )
}
