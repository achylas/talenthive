import React from 'react';

const CompAddJob = ({ handleAddJob, handleInputChange, newJob, setShowJobForm, setActiveTab, editingJob }) => {
  return (
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
              setShowJobForm(false);
              setActiveTab("jobs");
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
  );
};

export default CompAddJob;
