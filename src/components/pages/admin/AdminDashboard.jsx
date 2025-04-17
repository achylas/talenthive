"use client"

import { useState } from "react"
import AddJob from "./Addjob"
import "../admin/AdminDashboard.css"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "add-jobs":
        return <AddJob />
      case "view-jobs":
        return (
          <div className="content-container">
            <h2>View Jobs</h2>
            <p>Jobs listing will appear here</p>
          </div>
        )
      case "customers":
        return (
          <div className="content-container">
            <h2>Customers</h2>
            <p>Customers listing will appear here</p>
          </div>
        )
      case "users":
        return (
          <div className="content-container">
            <h2>Users</h2>
            <p>Users listing will appear here</p>
          </div>
        )
      default:
        return (
          <div className="content-container">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Total Jobs</h3>
                <p className="stat-number">24</p>
              </div>
              <div className="stat-card">
                <h3>Active Jobs</h3>
                <p className="stat-number">18</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">156</p>
              </div>
              <div className="stat-card">
                <h3>New Applications</h3>
                <p className="stat-number">42</p>
              </div>
            </div>
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li>New job posted: Senior Developer at TechCorp</li>
                <li>User John Doe applied for Marketing Manager</li>
                <li>Job expired: Junior Designer at CreativeStudio</li>
                <li>New company registered: InnovateX Solutions</li>
              </ul>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="admin-container">
      <div className="ad-sidebar">
        <div className="ad-logo">
          <h2>JobAdmin</h2>
        </div>
        <nav className="ad-nav-menu">
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
              Dashboard
            </li>
            <li className={activeTab === "add-jobs" ? "active" : ""} onClick={() => setActiveTab("add-jobs")}>
              Add Jobs
            </li>
            <li className={activeTab === "view-jobs" ? "active" : ""} onClick={() => setActiveTab("view-jobs")}>
              View Jobs
            </li>
            <li className={activeTab === "customers" ? "active" : ""} onClick={() => setActiveTab("customers")}>
              Customers
            </li>
            <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
              Users
            </li>
          </ul>
        </nav>
      </div>
      <div className="ad-main-content">
        <header className="ad-header">
          <div className="ad-search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="user-info">
            <span>Admin User</span>
            <div className="avatar">AU</div>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  )
}

export default AdminDashboard
