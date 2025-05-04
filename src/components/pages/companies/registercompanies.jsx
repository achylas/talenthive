"use client"
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useState } from "react"
import "../companies/registercomp.css"
import { auth} from "../authpages/firebase";
import { db } from "../authpages/firebase";
import { doc, setDoc, updateDoc, collection } from "firebase/firestore";
export default function CompanyRegistration() {
  // Form state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    companyDescription: "",
    website: "",
  })

  // Error state
  const [errors, setErrors] = useState({})

  // Logo state
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle logo upload
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogoFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Validate form
  const validateForm = () => {
    const formErrors = {}

    if (!formData.companyName.trim()) formErrors.companyName = "Company name is required"
    if (!formData.industry) formErrors.industry = "Industry is required"
    if (!formData.companySize) formErrors.companySize = "Company size is required"
    if (!formData.location.trim()) formErrors.location = "Location is required"
    if (!formData.contactName.trim()) formErrors.contactName = "Contact name is required"

    if (!formData.contactEmail.trim()) {
      formErrors.contactEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      formErrors.contactEmail = "Email is invalid"
    }

    if (!formData.contactPhone.trim()) formErrors.contactPhone = "Phone number is required"
    if (!formData.companyDescription.trim()) formErrors.companyDescription = "Company description is required"

    if (formData.website && !/^https?:\/\/\S+/.test(formData.website)) {
      formErrors.website = "Website URL must start with http:// or https://"
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  // Handle form submission
  // Make sure you import your Firebase config

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      const user = auth.currentUser;
      if (user) {
        try {
          // Save company data
          const companyRef = doc(db, "companies", user.uid);
          await setDoc(companyRef, {
            companyName: formData.companyName,
            industry: formData.industry,
            companySize: formData.companySize,
            location: formData.location,
            contactName: formData.contactName,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
            companyDescription: formData.companyDescription,
            website: formData.website,
          });
  
          // Upload logo if provided
          
  
          setIsSubmitting(false);
          setSubmitSuccess(true);
  
          setTimeout(() => {
            setFormData({
              companyName: "",
              industry: "",
              companySize: "",
              location: "",
              contactName: "",
              contactEmail: "",
              contactPhone: "",
              companyDescription: "",
              website: "",
            });
            setLogoFile(null);
            setLogoPreview(null);
            setSubmitSuccess(false);
            navigate("/companydashboard");
          }, 3000);
  
        } catch (error) {
          console.error("Error saving company data: ", error);
          setIsSubmitting(false);
        }
      } else {
        console.log("User not authenticated");
        setIsSubmitting(false);
      }
    }
  };
  
  

  return (
    <div className="comp-container">
      <div className="comp-header">
        <h1 className="comp-title">Talent Hive</h1>
        <p className="comp-subtitle">Company Registration</p>
      </div>
  
      {submitSuccess ? (
        <div className="comp-success-message">
          <h2>Registration Successful!</h2>
          <p>Your company has been registered with Talent Hive.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="comp-form">
          <div className="comp-form-grid">
            <div className="comp-form-group">
              <label className="comp-label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`comp-input ${errors.companyName ? 'comp-input-error' : ''}`}
                placeholder="Acme Inc."
              />
              {errors.companyName && <span className="comp-error-text">{errors.companyName}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`comp-select ${errors.industry ? 'comp-input-error' : ''}`}
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <span className="comp-error-text">{errors.industry}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Company Size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={`comp-select ${errors.companySize ? 'comp-input-error' : ''}`}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.companySize && <span className="comp-error-text">{errors.companySize}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`comp-input ${errors.location ? 'comp-input-error' : ''}`}
                placeholder="City, Country"
              />
              {errors.location && <span className="comp-error-text">{errors.location}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Contact Person *</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`comp-input ${errors.contactName ? 'comp-input-error' : ''}`}
                placeholder="John Doe"
              />
              {errors.contactName && <span className="comp-error-text">{errors.contactName}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`comp-input ${errors.contactEmail ? 'comp-input-error' : ''}`}
                placeholder="contact@company.com"
              />
              {errors.contactEmail && <span className="comp-error-text">{errors.contactEmail}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Contact Phone *</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={`comp-input ${errors.contactPhone ? 'comp-input-error' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.contactPhone && <span className="comp-error-text">{errors.contactPhone}</span>}
            </div>
  
            <div className="comp-form-group">
              <label className="comp-label">Website URL</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={`comp-input ${errors.website ? 'comp-input-error' : ''}`}
                placeholder="https://company.com"
              />
              <span className="comp-helper-text">Optional</span>
              {errors.website && <span className="comp-error-text">{errors.website}</span>}
            </div>
          </div>
  
          <div className="comp-form-group">
            <label className="comp-label">Company Logo</label>
            <div className="comp-logo-upload-container">
              <div
                className={`comp-logo-upload ${logoPreview ? 'comp-logo-preview' : ''}`}
                style={logoPreview ? { backgroundImage: `url(${logoPreview})` } : {}}
              >
                {!logoPreview && <span>Click to upload</span>}
                <input type="file" accept="image/*" onChange={handleLogoChange} className="comp-file-input" />
              </div>
              <div className="comp-logo-helper-text">
                <p>PNG, JPG or SVG (max. 2MB)</p>
                <p>Optional</p>
              </div>
            </div>
          </div>
  
          <div className="comp-form-group">
            <label className="comp-label">Company Description *</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className={`comp-textarea ${errors.companyDescription ? 'comp-input-error' : ''}`}
              placeholder="Tell us about your company, mission, and what you're looking for..."
              rows={5}
            />
            {errors.companyDescription && <span className="comp-error-text">{errors.companyDescription}</span>}
          </div>
  
          <button
            type="submit"
            className={`comp-button ${isSubmitting ? 'comp-button-disabled' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Company"}
          </button>
        </form>
      )}
    </div>
  );
  
}

