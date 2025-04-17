import { useState, useEffect } from "react"
import "./style.css"
import { db } from "../../authpages/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const filterOptions = {
  duration: ["All", "Full-time", "Part-time", "Contract"],
  salary: ["All", "Below 70k", "70k-90k", "Above 90k"],
  type: ["All", "Full Time", "Part Time", "Hybrid", "Freelance"],
}

export default function JobListingPage() {
  const [filters, setFilters] = useState({
    duration: "All",
    salary: "All",
    type: "All",
    domain: "All",
  })

  const [jobsData, setJobsData] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catSnapshot = await getDocs(collection(db, "categories"))
        const cats = catSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
        setCategories([{ id: "All", name: "All Domains" }, ...cats])
      } catch (error) {
        console.error("🚨 Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch jobs from Firebase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobSnapshot = await getDocs(collection(db, "jobs"))
        const jobs = jobSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setJobsData(jobs)
        setFilteredJobs(jobs)
      } catch (error) {
        console.error("🚨 Error fetching jobs:", error)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs on category change or other filters
  useEffect(() => {
    const filtered = jobsData.filter((job) => {
      const { duration, salary, type, domain } = filters

      if (domain !== "All" && job["cat-id"] !== domain) return false
      if (duration !== "All" && job.jobtype !== duration) return false

      if (salary !== "All") {
        const s = Number(job.salary)
        if (salary === "Below 70k" && s >= 70000) return false
        if (salary === "70k-90k" && (s < 70000 || s > 90000)) return false
        if (salary === "Above 90k" && s <= 90000) return false
      }

      if (type !== "All" && job.jobtype !== type) return false

      return true
    })

    setFilteredJobs(filtered)
  }, [filters, jobsData])

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value })
  }

  return (
    <div className="job-listing-container">
      <h1>🔥 Job Listings</h1>

      <div className="filter-container">
        {/* Render dynamic domain dropdown */}
        <div className="filter-group">
          <label>Domain</label>
          <select value={filters.domain} onChange={(e) => handleFilterChange("domain", e.target.value)}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Static filters */}
        {Object.entries(filterOptions).map(([filterType, options]) => (
          <div key={filterType} className="filter-group">
            <label>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</label>
            <select
              value={filters[filterType]}
              onChange={(e) => handleFilterChange(filterType, e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="job-cards-container">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => navigate(`/jobs/${job.id}`)}>
              <h3>{job.title}</h3>
              <p className="company">{job.companyName}</p>
              <div className="job-details">
                <span>{job.jobtype}</span>
                <span>{job.exper}</span>
                <span>${(job.salary / 1000).toFixed(1)}k</span>
              </div>
              <p className="description">{job.descr}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs found matching the filters.</p>
      )}
    </div>
  )
}
