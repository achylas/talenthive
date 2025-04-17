import React, { useState, useEffect } from "react";
import "../applicant/applicant.css"; // Import your CSS file for styling

const mockApplicants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    position: "Senior Frontend Developer",
    jobId: 1,
    applied: "1 day ago",
    status: "Reviewed",
    experience: "5 years",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    position: "UX Designer",
    jobId: 2,
    applied: "2 days ago",
    status: "Pending",
    experience: "3 years",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    position: "DevOps Engineer",
    jobId: 3,
    applied: "3 days ago",
    status: "Interviewed",
    experience: "7 years",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    position: "Product Manager",
    jobId: 4,
    applied: "5 days ago",
    status: "Hired",
    experience: "4 years",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    position: "Senior Frontend Developer",
    jobId: 1,
    applied: "1 week ago",
    status: "Rejected",
    experience: "2 years",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    position: "UX Designer",
    jobId: 2,
    applied: "3 days ago",
    status: "Interviewed",
    experience: "6 years",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    position: "DevOps Engineer",
    jobId: 3,
    applied: "2 weeks ago",
    status: "Hired",
    experience: "8 years",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    position: "Marketing Specialist",
    jobId: 5,
    applied: "4 days ago",
    status: "Pending",
    experience: "3 years",
  },
];

function ApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setApplicants(mockApplicants);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      applicant.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPosition =
      positionFilter === "all" ||
      applicant.position.toLowerCase() === positionFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPosition;
  });

  const positions = [...new Set(applicants.map((a) => a.position))];

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Applicants</h1>
          <p>Review and manage job applications</p>
        </div>
        <button className="btn-outline">Export Applicants</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Applicants</h2>
          <p>You have {applicants.length} total applicants</p>
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="all">All Positions</option>
            {positions.map((pos, i) => (
              <option key={i} value={pos.toLowerCase()}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading applicants...</div>
        ) : filteredApplicants.length === 0 ? (
          <div className="no-results">
            <h3>No applicants found</h3>
            <p>We couldn't find any applicants matching your search criteria.</p>
            <button
              className="btn-outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPositionFilter("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="applicant-list">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="applicant-card">
                <div>
                  <h3>{applicant.name}</h3>
                  <span className={`status ${applicant.status.toLowerCase()}`}>
                    {applicant.status}
                  </span>
                  <p>{applicant.email}</p>
                  <p>
                    <strong>{applicant.position}</strong> | Applied {applicant.applied}
                  </p>
                </div>
                <a className="btn-outline small" href={`/dashboard/applicants/${applicant.id}`}>
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantsPage;
