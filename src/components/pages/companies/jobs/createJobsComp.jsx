"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navigation from "./Navigation"
import "./JobPost.css"

function JobPost() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    deadline: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const companyId = localStorage.getItem("companyId")
    if (!companyId) {
      navigate("/login")
      return
    }

    // Get existing jobs or initialize empty array
    const existingJobs = JSON.parse(localStorage.getItem(`jobs_${companyId}`) || "[]")

    // Create new job with unique ID
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      companyId,
      datePosted: new Date().toISOString(),
      applicants: [],
    }

    // Add to existing jobs
    const updatedJobs = [...existingJobs, newJob]

    // Save back to localStorage
    localStorage.setItem(`jobs_${companyId}`, JSON.stringify(updatedJobs))

    // Redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="job-post-page">
      <Navigation />

      <div className="container">
        <div className="form-container">
          <h1 className="form-title">Post a New Job</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="type">Job Type</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary (USD)</label>
              <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">Responsibilities</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Application Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">
                Post Job
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobPost
