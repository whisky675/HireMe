import React from "react";
import "../Styles/ResumeForm.css";
import "../Styles/ResumeLayout.css";

function ResumeForm({ formData, setFormData }) {
  // Handle input changes for static fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array field changes (experience, education, etc.)
  const handleArrayChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[section]];
    updatedArray[index][name] = value;
    setFormData({ ...formData, [section]: updatedArray });
  };

  // Add new entry to an array section
  const addEntry = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  // Remove entry from an array section
  const removeEntry = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedArray });
  };

  return (
    <form className="resume-form">
      {/* Personal Info */}
      <h2>Personal Information</h2>
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input type="url" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
      <input type="url" name="portfolio" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} />
{/* Professional Summary */}
      <h2>Professional Summary</h2>
      <textarea
        name="summary"
        placeholder="Write a short professional summary..."
        value={formData.summary}
        onChange={handleChange}
      />
      {/* Education */}
      <h2>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="form-section">
          <input type="text" name="school" placeholder="School / University" value={edu.school} onChange={(e) => handleArrayChange("education", index, e)} />
          <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange("education", index, e)} />
          <input type="month" name="startDate" value={edu.startDate} onChange={(e) => handleArrayChange("education", index, e)} />
          <input type="month" name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange("education", index, e)} />
          <textarea name="details" placeholder="Details" value={edu.details} onChange={(e) => handleArrayChange("education", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("education", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("education", { school: "", degree: "", startDate: "", endDate: "", details: "" })}>Add Education</button>


      {/* Skills */}
      <h2>Skills</h2>
      <input type="text" name="skills" placeholder="Enter skills separated by commas" value={formData.skills} onChange={handleChange} />

      {/* Experience */}
      <h2>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="form-section">
          <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange("experience", index, e)} />
          <input type="text" name="position" placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange("experience", index, e)} />
          <input type="month" name="startDate" value={exp.startDate} onChange={(e) => handleArrayChange("experience", index, e)} />
          <input type="month" name="endDate" value={exp.endDate} onChange={(e) => handleArrayChange("experience", index, e)} />
          <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange("experience", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("experience", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("experience", { company: "", position: "", startDate: "", endDate: "", description: "" })}>Add Experience</button>

      {/* Projects */}
      <h2>Projects</h2>
      {formData.projects.map((proj, index) => (
        <div key={index} className="form-section">
          <input type="text" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange("projects", index, e)} />
          <input type="url" name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleArrayChange("projects", index, e)} />
          <textarea name="description" placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange("projects", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("projects", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("projects", { title: "", link: "", description: "" })}>Add Project</button>

      {/* Certifications */}
      <h2>Certifications</h2>
      {formData.certifications.map((cert, index) => (
        <div key={index} className="form-section">
          <input type="text" name="name" placeholder="Certification Name" value={cert.name} onChange={(e) => handleArrayChange("certifications", index, e)} />
          <input type="text" name="issuer" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleArrayChange("certifications", index, e)} />
          <input type="month" name="date" value={cert.date} onChange={(e) => handleArrayChange("certifications", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("certifications", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("certifications", { name: "", issuer: "", date: "" })}>Add Certification</button>

      {/* Awards */}
      <h2>Awards & Achievements</h2>
      {formData.awards.map((award, index) => (
        <div key={index} className="form-section">
          <input type="text" name="title" placeholder="Award Title" value={award.title} onChange={(e) => handleArrayChange("awards", index, e)} />
          <input type="text" name="organization" placeholder="Organization" value={award.organization} onChange={(e) => handleArrayChange("awards", index, e)} />
          <input type="month" name="date" value={award.date} onChange={(e) => handleArrayChange("awards", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("awards", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("awards", { title: "", organization: "", date: "" })}>Add Award</button>
    {/* Languages */}
      <h2>Languages</h2>
      {formData.languages.map((lang, index) => (
        <div key={index} className="form-section">
          <input type="text" name="name" placeholder="Language" value={lang.name} onChange={(e) => handleArrayChange("languages", index, e)} />
          <input type="text" name="proficiency" placeholder="Proficiency (e.g., Fluent)" value={lang.proficiency} onChange={(e) => handleArrayChange("languages", index, e)} />
          <button className="button-modern1" type="button" onClick={() => removeEntry("languages", index)}>Remove</button>
        </div>
      ))}
      <button className="button-modern" type="button" onClick={() => addEntry("languages", { name: "", proficiency: "" })}>Add Language</button>
    
    
    </form>
  );
}

export default ResumeForm;
