import React from 'react';

const CompSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="comp-sidebar">
      <ul className="sidebar-links">
        <li
          className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`sidebar-item ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Job Listings
        </li>
        <li
          className={`sidebar-item ${activeTab === 'add-job' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-job')}
        >
          Add Job
        </li>
      </ul>
    </aside>
  );
};

export default CompSidebar;
