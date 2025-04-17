import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/global.css"
export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="job-card" onClick={() => navigate(`/job/${job.id}`, { state: { job } })}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p>{job.description.slice(0, 60)}...</p>
      <button className="apply-button">Apply Now</button>
    </div>
  );
}
