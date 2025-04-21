"use client"
import { useNavigate } from "react-router-dom";

import { useState } from "react"

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
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Form data:", formData)
        console.log("Logo file:", logoFile)

        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after 3 seconds
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
          })
          setLogoFile(null)
          setLogoPreview(null)
          setSubmitSuccess(false)
          navigate("/companydashboard") 
        }, 3000)
      }, 1500)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Talent Hive</h1>
        <p style={styles.subtitle}>Company Registration</p>
      </div>

      {submitSuccess ? (
        <div style={styles.successMessage}>
          <h2>Registration Successful!</h2>
          <p>Your company has been registered with Talent Hive.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                style={errors.companyName ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="Acme Inc."
              />
              {errors.companyName && <span style={styles.errorText}>{errors.companyName}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                style={errors.industry ? { ...styles.select, ...styles.inputError } : styles.select}
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
              {errors.industry && <span style={styles.errorText}>{errors.industry}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Company Size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                style={errors.companySize ? { ...styles.select, ...styles.inputError } : styles.select}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.companySize && <span style={styles.errorText}>{errors.companySize}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={errors.location ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="City, Country"
              />
              {errors.location && <span style={styles.errorText}>{errors.location}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Person *</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                style={errors.contactName ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="John Doe"
              />
              {errors.contactName && <span style={styles.errorText}>{errors.contactName}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                style={errors.contactEmail ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="contact@company.com"
              />
              {errors.contactEmail && <span style={styles.errorText}>{errors.contactEmail}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Phone *</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                style={errors.contactPhone ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="+1 (555) 123-4567"
              />
              {errors.contactPhone && <span style={styles.errorText}>{errors.contactPhone}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Website URL</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={errors.website ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="https://company.com"
              />
              <span style={styles.helperText}>Optional</span>
              {errors.website && <span style={styles.errorText}>{errors.website}</span>}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Company Logo</label>
            <div style={styles.logoUploadContainer}>
              <div
                style={
                  logoPreview ? { ...styles.logoPreview, backgroundImage: `url(${logoPreview})` } : styles.logoUpload
                }
              >
                {!logoPreview && <span>Click to upload</span>}
                <input type="file" accept="image/*" onChange={handleLogoChange} style={styles.fileInput} />
              </div>
              <div style={styles.logoHelperText}>
                <p>PNG, JPG or SVG (max. 2MB)</p>
                <p>Optional</p>
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Company Description *</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              style={errors.companyDescription ? { ...styles.textarea, ...styles.inputError } : styles.textarea}
              placeholder="Tell us about your company, mission, and what you're looking for..."
              rows={5}
            />
            {errors.companyDescription && <span style={styles.errorText}>{errors.companyDescription}</span>}
          </div>

          <button
            type="submit"
            style={isSubmitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Company"}
          </button>
        </form>
      )}
    </div>
  )
}

// Inline styles
const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      color: "#333333",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "20px 0",
      borderBottom: "2px solid #001f3f",
    },
    title: {
      fontSize: "36px",
      color: "#001f3f",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "18px",
      color: "#333333",
      margin: "0",
    },
    form: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "30px",
      boxShadow: "0 2px 15px rgba(0, 31, 63, 0.1)",
      color: "#333333",
      border: "1px solid #e0e0e0",
    },
    formHeader: {
      marginBottom: "20px",
    },
    formTitle: {
      fontSize: "20px",
      color: "#001f3f",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    formSubtitle: {
      fontSize: "14px",
      color: "#666666",
      margin: "0",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#001f3f",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      boxSizing: "border-box",
      color: "#333333",
      backgroundColor: "#fff",
      transition: "border-color 0.2s ease-in-out",
      "&:focus": {
        borderColor: "#001f3f",
        outline: "none",
      },
    },
    select: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      backgroundColor: "#fff",
      boxSizing: "border-box",
      color: "#333333",
      appearance: "none",
      backgroundImage:
        'url(\'data:image/svg+xml;utf8,<svg fill="%23001f3f" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
      backgroundSize: "20px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      boxSizing: "border-box",
      resize: "vertical",
      color: "#333333",
      backgroundColor: "#fff",
      minHeight: "120px",
    },
    inputError: {
      borderColor: "#dc3545",
      boxShadow: "0 0 0 1px rgba(220, 53, 69, 0.25)",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "12px",
      marginTop: "5px",
      display: "block",
    },
    helperText: {
      color: "#6c757d",
      fontSize: "12px",
      marginTop: "5px",
      display: "block",
    },
    logoUploadContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    logoUpload: {
      width: "120px",
      height: "120px",
      border: "2px dashed #001f3f",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative",
      color: "#001f3f",
      fontSize: "14px",
      backgroundColor: "rgba(0, 31, 63, 0.05)",
    },
    logoPreview: {
      width: "120px",
      height: "120px",
      border: "1px solid #001f3f",
      borderRadius: "4px",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      cursor: "pointer",
    },
    fileInput: {
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      cursor: "pointer",
    },
    logoHelperText: {
      fontSize: "12px",
      color: "#6c757d",
    },
    button: {
      backgroundColor: "#001f3f",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
      transition: "background-color 0.3s",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#003366",
      },
    },
    buttonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    successMessage: {
      backgroundColor: "#ffffff",
      border: "2px solid #001f3f",
      borderRadius: "8px",
      padding: "30px",
      textAlign: "center",
      color: "#001f3f",
      boxShadow: "0 2px 15px rgba(0, 31, 63, 0.1)",
    },
    sectionDivider: {
      height: "1px",
      backgroundColor: "#e0e0e0",
      margin: "30px 0",
      position: "relative",
    },
  }
  
