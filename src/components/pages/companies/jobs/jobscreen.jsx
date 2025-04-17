import React, { useState, useEffect } from "react";
import { mockJobs } from "./mockJobs";
import "../jobs/jobscreen.css";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDepartment =
      departmentFilter === "all" || job.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Jobs</h1>
          <p>Manage your job postings and track applications</p>
        </div>
        <button className="primary-button">Post New Job</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Job Listings</h2>
          <p>You have {jobs.length} total job postings</p>
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
            <option value="marketing">Marketing</option>
            <option value="support">Support</option>
            <option value="data">Data</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="no-results">
            <h3>No jobs found</h3>
            <p>We couldn't find any jobs matching your search criteria.</p>
            <button onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setDepartmentFilter("all");
            }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="job-list">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
                  <p>{job.department} • {job.location} • {job.type}</p>
                  <small>{job.applicants} applicants • Posted {job.posted}</small>
                </div>
                <div className="job-actions">
                  <button>View Details</button>
                  <button>View Applicants</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
