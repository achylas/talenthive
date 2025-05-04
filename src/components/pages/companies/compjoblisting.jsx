import React from 'react';

const CompJobListings = ({ filteredJobs, setShowJobForm, setActiveTab, setEditingJob, setNewJob, handleEditJob, handleDeleteJob, toggleJobStatus }) => {
  return (
    <div className="comp-jobs-view">
      <div className="comp-jobs-header">
        <h3>All Job Listings ({filteredJobs.length})</h3>
        <button
          className="comp-add-job-btn"
          onClick={() => {
            setEditingJob(null);
            setNewJob({
              title: "",
              department: "",
              location: "",
              type: "Full-time",
              experience: "",
              salary: "",
              description: "",
            });
            setShowJobForm(true);
            setActiveTab("add-job");
          }}
        >
          {/* <Plus size={16} /> */}
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
                    {/* <Edit size={16} /> */}
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>
                    {/* <Trash2 size={16} /> */}
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
  );
};

export default CompJobListings;
