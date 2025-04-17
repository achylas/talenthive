"use client"

import { useEffect, useState } from "react"
import "../admin/Addjob.css"
import { db } from "../authpages/firebase"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"

const AddJob = () => {
  const [jobData, setJobData] = useState({
    categoryId: "",
    companyName: "",
    description: "",
    experience: "",
    jobType: "",
    salary: "",
    title: "",
    valid: true,
  })

  const [categories, setCategories] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"))
        const fetchedCategories = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }))
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch jobs based on selected category
  useEffect(() => {
    const fetchJobsByCategory = async () => {
      if (!jobData.categoryId) return
      try {
        const jobsRef = collection(db, "jobs")
        const q = query(jobsRef, where("cat-id", "==", jobData.categoryId))
        const snapshot = await getDocs(q)
        const jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setFilteredJobs(jobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    fetchJobsByCategory()
  }, [jobData.categoryId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setJobData({
      ...jobData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newJob = {
        "cat-id": jobData.categoryId,
        companyName: jobData.companyName,
        descr: jobData.description,
        exper: jobData.experience,
        jobtype: jobData.jobType,
        salary: Number(jobData.salary),
        title: jobData.title,
        valid: jobData.valid,
      }

      await addDoc(collection(db, "jobs"), newJob)
      alert("✅ Job added to Firebase successfully!")

      setJobData({
        categoryId: "",
        companyName: "",
        description: "",
        experience: "",
        jobType: "",
        salary: "",
        title: "",
        valid: true,
      })
      setFilteredJobs([]) // Clear job list on submission
    } catch (error) {
      console.error("❌ Error adding job to Firebase:", error)
      alert("Failed to add job. Please try again.")
    }
  }

  return (
    <div className="add-job-container">
      <h2>Add New Job</h2>
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input type="text" id="title" name="title" value={jobData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={jobData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select id="categoryId" name="categoryId" value={jobData.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Job Type</label>
            <select id="jobType" name="jobType" value={jobData.jobType} onChange={handleChange} required>
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="hybrid">Hybrid</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="experience">Experience (years)</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={jobData.experience}
              onChange={handleChange}
              placeholder="e.g. 5+ years"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="e.g. 2500000"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" id="valid" name="valid" checked={jobData.valid} onChange={handleChange} />
          <label htmlFor="valid">Active/Valid Job Posting</label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Add Job
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() =>
              setJobData({
                categoryId: "",
                companyName: "",
                description: "",
                experience: "",
                jobType: "",
                salary: "",
                title: "",
                valid: true,
              })
            }
          >
            Cancel
          </button>
        </div>
      </form>

      {/* 🔍 Filtered Jobs Section */}
      {filteredJobs.length > 0 && (
        <div className="job-list">
          <h3>Jobs for Selected Category</h3>
          <ul>
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <strong>{job.title}</strong> at <em>{job.companyName}</em> — {job.jobtype}, {job.salary}$
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AddJob
