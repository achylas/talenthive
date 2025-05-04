import React, { useState } from 'react';
import CompSidebar from './compside';
import CompJobListings from './compjoblisting';
import CompAddJob from './compaddjobs';
import TalentHiveDashboard from './dashboardcomp';

const Layout = () => {
  const [activeTab, setActiveTab] = useState("/companydashboard");
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    salary: "",
    description: "",
  });
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const filteredJobs = jobs.filter(job => job.title.includes('')); // Example filtering, update as needed

  return (
    <div className="layout">
      <CompSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === "dashboard" && (
          <TalentHiveDashboard
            activeTab={activeTab}
            activeJobs={5}
            totalApplicants={100}
            averageApplicantsPerJob={20}
            jobs={jobs}
            setActiveTab={setActiveTab}
            setShowJobForm={setShowJobForm}
          />
        )}

        {activeTab === "jobs" && !showJobForm && (
          <CompJobListings
            filteredJobs={filteredJobs}
            setShowJobForm={setShowJobForm}
            setActiveTab={setActiveTab}
            setEditingJob={setEditingJob}
            setNewJob={setNewJob}
            handleEditJob={() => {}}
            handleDeleteJob={() => {}}
            toggleJobStatus={() => {}}
          />
        )}

        {activeTab === "add-job" && showJobForm && (
          <CompAddJob
            handleAddJob={() => {}}
            handleInputChange={() => {}}
            newJob={newJob}
            setShowJobForm={setShowJobForm}
            setActiveTab={setActiveTab}
            editingJob={editingJob}
          />
        )}
      </main>
    </div>
  );
};

export default Layout;
