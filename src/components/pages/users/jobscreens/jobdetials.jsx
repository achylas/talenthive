"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore"
import { db } from "../../authpages/firebase"
import "./jobdetails.css"
import {
  Building2,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Calendar,
  GraduationCap,
  Share2,
  Bookmark,
  ArrowLeft,
  Users,
  Globe,
  Mail,
  Printer,
  Star,
  CheckCircle,
  Award,
  Heart,
  Eye,
  User,
  FileText,
  ChevronRight,
} from "lucide-react"

export default function JobDetails() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [similarJobs, setSimilarJobs] = useState([])
  const [activeTab, setActiveTab] = useState("description")
  const [showApplyModal, setShowApplyModal] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", jobId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const jobData = { id: docSnap.id, ...docSnap.data() }
          setJob(jobData)

          // Fetch similar jobs
          fetchSimilarJobs(jobData)
        } else {
          console.log("No such job!")
        }
      } catch (error) {
        console.error("Error fetching job:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchSimilarJobs = async (currentJob) => {
      try {
        // Query for jobs with similar title or company
        const jobsRef = collection(db, "jobs")
        const q = query(jobsRef, where("jobtype", "==", currentJob.jobtype || "Full-time"), limit(3))

        const querySnapshot = await getDocs(q)
        const jobs = []

        querySnapshot.forEach((doc) => {
          // Don't include the current job
          if (doc.id !== jobId) {
            jobs.push({ id: doc.id, ...doc.data() })
          }
        })

        setSimilarJobs(jobs)
      } catch (error) {
        console.error("Error fetching similar jobs:", error)
      }
    }

    fetchJob()

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [jobId])

  const handleApply = () => {
    setShowApplyModal(true)
  }

  const closeApplyModal = () => {
    setShowApplyModal(false)
  }

  const submitApplication = (e) => {
    e.preventDefault()
    alert("Application Submitted Successfully!")
    setShowApplyModal(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmailJob = () => {
    const subject = `Job Opportunity: ${job?.title} at ${job?.companyName}`
    const body = `Check out this job opportunity: ${job?.title} at ${job?.companyName}.\n\nSalary: $${job?.salary}\nExperience Required: ${job?.exper}\n\nJob Description: ${job?.descr}`

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    )

  if (!job)
    return (
      <div className="not-found-container">
        <h2>Job not found</h2>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Jobs
        </button>
      </div>
    )

  // Format the date (assuming job has a postedDate field, if not it will use current date)
  const postedDate = job.postedDate ? new Date(job.postedDate) : new Date()
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate days ago
  const daysAgo = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24))

  // Calculate application deadline (assuming 30 days from posting if not specified)
  const deadlineDate = job.deadline ? new Date(job.deadline) : new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000)

  const daysLeft = Math.max(0, Math.floor((deadlineDate - new Date()) / (1000 * 60 * 60 * 24)))

  // Format deadline
  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Skills (example - would come from job data)
  const skills = job.skills || ["Communication", "Problem Solving", "Teamwork", "Time Management"]

  // Job stats (example - would come from job data)
  const jobStats = {
    views: job.views || 245,
    applicants: job.applicants || 32,
    interviews: job.interviews || 8,
    timeToHire: job.timeToHire || "2 weeks",
  }

  return (
    <div className="job-details-page">
      <div className="job-details-container">
        <div className="job-header">
          <div className="company-logo">
            {job.companyLogo ? (
              <img src={job.companyLogo || "/placeholder.svg"} alt={`${job.companyName} logo`} />
            ) : (
              <div className="company-initial">{job.companyName?.charAt(0) || "C"}</div>
            )}
          </div>
          <div className="job-title-section">
            <div className="job-status-badge">{daysAgo < 2 ? "New" : "Active"}</div>
            <h1>{job.title}</h1>
            <div className="company-info">
              <Building2 size={18} />
              <span>{job.companyName}</span>
              {job.location && (
                <>
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </>
              )}
              <Calendar size={18} />
              <span>Posted {daysAgo === 0 ? "today" : daysAgo === 1 ? "yesterday" : `${daysAgo} days ago`}</span>
            </div>
          </div>
          <div className="action-buttons-top">
            <button className="icon-button bookmark-button" title="Save Job">
              <Bookmark size={18} />
              <span>Save</span>
            </button>
            <button className="icon-button share-button" title="Share Job" onClick={handleEmailJob}>
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button className="icon-button print-button" title="Print Job" onClick={handlePrint}>
              <Printer size={18} />
              <span className="hide-on-mobile">Print</span>
            </button>
          </div>
        </div>

        <div className="job-quick-actions">
          <button className="quick-apply-button" onClick={handleApply}>
            Quick Apply
          </button>
          <div className="job-stats">
            <div className="job-stat">
              <Eye size={16} />
              <span>{jobStats.views} views</span>
            </div>
            <div className="job-stat">
              <User size={16} />
              <span>{jobStats.applicants} applicants</span>
            </div>
          </div>
        </div>

        <div className="job-content">
          <div className="job-content-layout">
            <div className="job-main-content">
              <div className="job-tabs">
                <button
                  className={`job-tab ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Job Description
                </button>
                <button
                  className={`job-tab ${activeTab === "company" ? "active" : ""}`}
                  onClick={() => setActiveTab("company")}
                >
                  Company
                </button>
                <button
                  className={`job-tab ${activeTab === "reviews" ? "active" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>

              {activeTab === "description" && (
                <div className="job-tab-content">
                  <div className="job-highlights">
                    <div className="highlight-card">
                      <Briefcase size={20} />
                      <h3>Job Type</h3>
                      <p>{job.jobtype || "Full-time"}</p>
                    </div>
                    <div className="highlight-card">
                      <DollarSign size={20} />
                      <h3>Salary</h3>
                      <p>${job.salary || "Competitive"}</p>
                    </div>
                    <div className="highlight-card">
                      <GraduationCap size={20} />
                      <h3>Experience</h3>
                      <p>{job.exper || "Not specified"}</p>
                    </div>
                    <div className="highlight-card">
                      <Clock size={20} />
                      <h3>Deadline</h3>
                      <p>{daysLeft > 0 ? `${daysLeft} days left` : "Expired"}</p>
                    </div>
                  </div>

                  <div className="job-sections">
                    <section className="job-section">
                      <h2>Overview</h2>
                      <div className="section-content">
                        <p>{job.descr}</p>
                      </div>
                    </section>

                    <section className="job-section">
                      <h2>Required Skills</h2>
                      <div className="section-content">
                        <div className="skills-container">
                          {skills.map((skill, index) => (
                            <span key={index} className="skill-badge">
                              <CheckCircle size={14} />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>

                    {job.responsibilities && (
                      <section className="job-section">
                        <h2>Key Responsibilities</h2>
                        <div className="section-content">
                          <ul className="enhanced-list">
                            {typeof job.responsibilities === "string" ? (
                              <li>{job.responsibilities}</li>
                            ) : Array.isArray(job.responsibilities) ? (
                              job.responsibilities.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                              <li>Contact company for more details</li>
                            )}
                          </ul>
                        </div>
                      </section>
                    )}

                    {job.requirements && (
                      <section className="job-section">
                        <h2>Requirements & Qualifications</h2>
                        <div className="section-content">
                          <ul className="enhanced-list">
                            {typeof job.requirements === "string" ? (
                              <li>{job.requirements}</li>
                            ) : Array.isArray(job.requirements) ? (
                              job.requirements.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                              <li>Contact company for more details</li>
                            )}
                          </ul>
                        </div>
                      </section>
                    )}

                    {job.benefits && (
                      <section className="job-section">
                        <h2>Benefits & Perks</h2>
                        <div className="section-content">
                          <ul className="benefits-list">
                            {typeof job.benefits === "string" ? (
                              <li>{job.benefits}</li>
                            ) : Array.isArray(job.benefits) ? (
                              job.benefits.map((item, index) => (
                                <li key={index} className="benefit-item">
                                  <Award size={16} className="benefit-icon" />
                                  <span>{item}</span>
                                </li>
                              ))
                            ) : (
                              <li>Contact company for more details</li>
                            )}
                          </ul>
                        </div>
                      </section>
                    )}

                    <section className="job-section">
                      <h2>Application Process</h2>
                      <div className="section-content">
                        <div className="application-process">
                          <div className="process-step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                              <h4>Apply Online</h4>
                              <p>Submit your application through our online portal</p>
                            </div>
                          </div>
                          <div className="process-step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                              <h4>Initial Screening</h4>
                              <p>Our HR team will review your application</p>
                            </div>
                          </div>
                          <div className="process-step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                              <h4>Interview</h4>
                              <p>Selected candidates will be invited for interviews</p>
                            </div>
                          </div>
                          <div className="process-step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                              <h4>Job Offer</h4>
                              <p>Successful candidates will receive a job offer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === "company" && (
                <div className="job-tab-content">
                  <section className="job-section">
                    <h2>About {job.companyName}</h2>
                    <div className="section-content">
                      <p>
                        {job.companyDescription ||
                          `${job.companyName} is a leading company in its industry, committed to innovation and excellence. 
                          With a strong focus on employee development and customer satisfaction, we strive to create 
                          a positive impact in everything we do.`}
                      </p>

                      <div className="company-stats">
                        <div className="company-stat">
                          <Users size={18} />
                          <span>Company Size</span>
                          <strong>{job.companySize || "51-200 employees"}</strong>
                        </div>
                        <div className="company-stat">
                          <Globe size={18} />
                          <span>Website</span>
                          <strong>
                            <a href={job.companyWebsite || "#"} target="_blank" rel="noopener noreferrer">
                              {job.companyWebsite || "company.com"}
                            </a>
                          </strong>
                        </div>
                        <div className="company-stat">
                          <Building2 size={18} />
                          <span>Industry</span>
                          <strong>{job.industry || "Technology"}</strong>
                        </div>
                        <div className="company-stat">
                          <MapPin size={18} />
                          <span>Headquarters</span>
                          <strong>{job.headquarters || job.location || "New York, NY"}</strong>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="job-section">
                    <h2>Company Culture</h2>
                    <div className="section-content">
                      <p>
                        {job.companyCulture ||
                          `At ${job.companyName}, we believe in fostering a collaborative and inclusive work environment 
                          where innovation thrives. Our team members are encouraged to bring their authentic selves to work 
                          and contribute their unique perspectives to drive our collective success.`}
                      </p>

                      <div className="culture-values">
                        <div className="culture-value">
                          <h4>Innovation</h4>
                          <p>We embrace new ideas and technologies</p>
                        </div>
                        <div className="culture-value">
                          <h4>Collaboration</h4>
                          <p>We work together to achieve common goals</p>
                        </div>
                        <div className="culture-value">
                          <h4>Excellence</h4>
                          <p>We strive for the highest quality in everything we do</p>
                        </div>
                        <div className="culture-value">
                          <h4>Integrity</h4>
                          <p>We act with honesty and transparency</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="job-tab-content">
                  <section className="job-section">
                    <h2>Employee Reviews</h2>
                    <div className="section-content">
                      <div className="company-rating">
                        <div className="rating-score">
                          <span className="score">4.2</span>
                          <div className="stars">
                            <Star className="star filled" size={20} />
                            <Star className="star filled" size={20} />
                            <Star className="star filled" size={20} />
                            <Star className="star filled" size={20} />
                            <Star className="star half-filled" size={20} />
                          </div>
                          <span className="total-reviews">Based on 48 reviews</span>
                        </div>

                        <div className="rating-breakdown">
                          <div className="rating-category">
                            <span>Work/Life Balance</span>
                            <div className="rating-bar-container">
                              <div className="rating-bar" style={{ width: "85%" }}></div>
                            </div>
                            <span>4.3</span>
                          </div>
                          <div className="rating-category">
                            <span>Compensation</span>
                            <div className="rating-bar-container">
                              <div className="rating-bar" style={{ width: "75%" }}></div>
                            </div>
                            <span>3.8</span>
                          </div>
                          <div className="rating-category">
                            <span>Career Growth</span>
                            <div className="rating-bar-container">
                              <div className="rating-bar" style={{ width: "80%" }}></div>
                            </div>
                            <span>4.0</span>
                          </div>
                          <div className="rating-category">
                            <span>Management</span>
                            <div className="rating-bar-container">
                              <div className="rating-bar" style={{ width: "90%" }}></div>
                            </div>
                            <span>4.5</span>
                          </div>
                        </div>
                      </div>

                      <div className="reviews-list">
                        <div className="review-card">
                          <div className="review-header">
                            <div className="review-title">
                              <h4>"Great place to grow professionally"</h4>
                              <div className="review-stars">
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                              </div>
                            </div>
                            <div className="reviewer-info">
                              <span>Software Engineer</span>
                              <span>•</span>
                              <span>Full-time</span>
                              <span>•</span>
                              <span>2 years</span>
                            </div>
                          </div>
                          <div className="review-content">
                            <p>
                              The company provides excellent opportunities for professional growth. Management is
                              supportive and the work environment is collaborative.
                            </p>
                          </div>
                          <div className="review-footer">
                            <div className="pros-cons">
                              <div className="pros">
                                <h5>Pros</h5>
                                <p>Great benefits, flexible hours, supportive team</p>
                              </div>
                              <div className="cons">
                                <h5>Cons</h5>
                                <p>Can be fast-paced during project deadlines</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="review-card">
                          <div className="review-header">
                            <div className="review-title">
                              <h4>"Challenging but rewarding work"</h4>
                              <div className="review-stars">
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star filled" size={16} />
                                <Star className="star" size={16} />
                              </div>
                            </div>
                            <div className="reviewer-info">
                              <span>Product Manager</span>
                              <span>•</span>
                              <span>Full-time</span>
                              <span>•</span>
                              <span>1 year</span>
                            </div>
                          </div>
                          <div className="review-content">
                            <p>
                              Work can be challenging but very rewarding. The company values innovation and encourages
                              employees to contribute ideas.
                            </p>
                          </div>
                          <div className="review-footer">
                            <div className="pros-cons">
                              <div className="pros">
                                <h5>Pros</h5>
                                <p>Innovative projects, good compensation, learning opportunities</p>
                              </div>
                              <div className="cons">
                                <h5>Cons</h5>
                                <p>Work-life balance can be challenging at times</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="see-more-reviews">
                        <button className="see-more-button">
                          See all 48 reviews
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>

            <div className="job-sidebar">
              <div className="sidebar-section application-deadline">
                <h3>Application Deadline</h3>
                <div className="deadline-info">
                  <Calendar size={18} />
                  <span>{formattedDeadline}</span>
                </div>
                <div className="deadline-countdown">
                  {daysLeft > 0 ? (
                    <>
                      <div className="countdown-progress">
                        <div
                          className="countdown-bar"
                          style={{ width: `${Math.min(100, (daysLeft / 30) * 100)}%` }}
                        ></div>
                      </div>
                      <span>{daysLeft} days left to apply</span>
                    </>
                  ) : (
                    <span className="deadline-expired">Application deadline has passed</span>
                  )}
                </div>
              </div>

              <div className="sidebar-section job-summary">
                <h3>Job Summary</h3>
                <ul className="summary-list">
                  <li>
                    <Briefcase size={16} />
                    <span>Job Type:</span>
                    <strong>{job.jobtype || "Full-time"}</strong>
                  </li>
                  <li>
                    <DollarSign size={16} />
                    <span>Salary:</span>
                    <strong>${job.salary || "Competitive"}</strong>
                  </li>
                  <li>
                    <MapPin size={16} />
                    <span>Location:</span>
                    <strong>{job.location || "Remote"}</strong>
                  </li>
                  <li>
                    <GraduationCap size={16} />
                    <span>Experience:</span>
                    <strong>{job.exper || "Not specified"}</strong>
                  </li>
                  <li>
                    <Calendar size={16} />
                    <span>Posted:</span>
                    <strong>{formattedDate}</strong>
                  </li>
                  <li>
                    <Users size={16} />
                    <span>Vacancies:</span>
                    <strong>{job.vacancies || "1"}</strong>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section company-contact">
                <h3>Contact Information</h3>
                <ul className="contact-list">
                  <li>
                    <Mail size={16} />
                    <span>Email:</span>
                    <a href={`mailto:${job.contactEmail || "careers@company.com"}`}>
                      {job.contactEmail || "careers@company.com"}
                    </a>
                  </li>
                  <li>
                    <Globe size={16} />
                    <span>Website:</span>
                    <a href={job.companyWebsite || "#"} target="_blank" rel="noopener noreferrer">
                      {job.companyWebsite || "company.com"}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section similar-jobs">
                <h3>Similar Jobs</h3>
                {similarJobs.length > 0 ? (
                  <div className="similar-jobs-list">
                    {similarJobs.map((similarJob) => (
                      <div key={similarJob.id} className="similar-job-card">
                        <h4>{similarJob.title}</h4>
                        <div className="similar-job-company">
                          <Building2 size={14} />
                          <span>{similarJob.companyName}</span>
                        </div>
                        <div className="similar-job-details">
                          <span>
                            <MapPin size={14} />
                            {similarJob.location || "Remote"}
                          </span>
                          <span>
                            <DollarSign size={14} />${similarJob.salary}
                          </span>
                        </div>
                        <button className="view-job-button" onClick={() => navigate(`/jobs/${similarJob.id}`)}>
                          View Job
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-similar-jobs">No similar jobs found at the moment.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="job-footer">
          <div className="job-actions">
            <button className="apply-button" onClick={handleApply}>
              Apply Now
            </button>
            <button className="save-job-button">
              <Heart size={18} />
              Save Job
            </button>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back to Jobs
          </button>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="application-modal">
            <div className="modal-header">
              <h2>Apply for {job.title}</h2>
              <button className="close-modal" onClick={closeApplyModal}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={submitApplication} className="application-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="resume">Resume/CV *</label>
                  <div className="file-upload">
                    <FileText size={18} />
                    <span>Upload your resume</span>
                    <input type="file" id="resume" accept=".pdf,.doc,.docx" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    rows="4"
                    placeholder="Tell us why you're a good fit for this position"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience *</label>
                  <select id="experience" required>
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability *</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input type="radio" id="immediate" name="availability" value="immediate" required />
                      <label htmlFor="immediate">Immediate</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" id="twoWeeks" name="availability" value="twoWeeks" />
                      <label htmlFor="twoWeeks">2 weeks notice</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" id="oneMonth" name="availability" value="oneMonth" />
                      <label htmlFor="oneMonth">1 month notice</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-option">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the terms and conditions *</label>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeApplyModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
