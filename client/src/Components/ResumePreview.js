import React from "react";
import jsPDF from "jspdf";
import "../Styles/ResumePreview.css";
import "../Styles/ResumeLayout.css";

function formatDate(date) {
  if (!date) return "";
  const options = { year: "numeric", month: "short" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function ResumePreview({ formData }) {
  // 📄 Export ATS-friendly PDF
  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    let y = 40;

    const addSection = (title, content) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(title, 40, y);
      y += 12;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(40, y, 550, y);
      y += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      if (Array.isArray(content)) {
        content.forEach((line) => {
          const split = doc.splitTextToSize(line, 500);
          doc.text(split, 50, y);
          y += split.length * 14;
        });
      } else {
        const split = doc.splitTextToSize(content, 500);
        doc.text(split, 40, y);
        y += split.length * 14;
      }
      y += 10;
    };

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(formData.name || "Your Name", 40, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    if (formData.email) doc.text(`Email: ${formData.email}`, 40, y);
    if (formData.phone) doc.text(`Phone: ${formData.phone}`, 200, y);
    if (formData.location) doc.text(`Location: ${formData.location}`, 350, y);
    y += 15;

    if (formData.linkedin) doc.text(`LinkedIn: ${formData.linkedin}`, 40, y);
    if (formData.portfolio) doc.text(`Portfolio: ${formData.portfolio}`, 300, y);
    y += 25;

    // Sections
    if (formData.summary) addSection("SUMMARY", formData.summary);

    if (formData.education?.length > 0) {
      addSection(
        "EDUCATION",
        formData.education.map(
          (edu) =>
            `${edu.degree} — ${edu.school} (${formatDate(edu.startDate)} - ${
              edu.endDate ? formatDate(edu.endDate) : "Present"
            })`
        )
      );
    }

    if (formData.skills) {
      addSection(
        "SKILLS",
        formData.skills.split(",").map((s) => `• ${s.trim()}`)
      );
    }

    if (formData.experience?.length > 0) {
      addSection(
        "WORK EXPERIENCE",
        formData.experience.flatMap((exp) => [
          `${exp.position} — ${exp.company} (${formatDate(exp.startDate)} - ${
            exp.endDate ? formatDate(exp.endDate) : "Present"
          })`,
          ...(exp.description
            ? exp.description.split("\n").map((d) => `• ${d.trim()}`)
            : []),
        ])
      );
    }

    if (formData.projects?.length > 0) {
      addSection(
        "PROJECTS",
        formData.projects.flatMap((proj) => [
          `${proj.title} ${proj.link ? `— ${proj.link}` : ""}`,
          ...(proj.description
            ? proj.description.split("\n").map((d) => `• ${d.trim()}`)
            : []),
        ])
      );
    }

    if (formData.certifications?.length > 0) {
      addSection(
        "CERTIFICATIONS",
        formData.certifications.map(
          (cert) =>
            `${cert.name} — ${cert.issuer} (${formatDate(cert.date)})`
        )
      );
    }

    if (formData.awards?.length > 0) {
      addSection(
        "AWARDS & ACHIEVEMENTS",
        formData.awards.map(
          (award) =>
            `${award.title} — ${award.organization} (${formatDate(
              award.date
            )})`
        )
      );
    }

    if (formData.languages?.length > 0) {
      addSection(
        "LANGUAGES",
        formData.languages.map(
          (lang) => `${lang.name} — ${lang.proficiency}`
        )
      );
    }

    doc.save("My_Resume.pdf");
  };

  return (
    <div className="resume-container">
      <div className="resume-box">
        <h1>{formData.name || "Your Name"}</h1>
        <p className="contact">
          {formData.email && `Email: ${formData.email} | `}
          {formData.phone && `Phone: ${formData.phone} | `}
          {formData.location && `Location: ${formData.location}`}
        </p>
        <p className="contact">
          {formData.linkedin && `LinkedIn: ${formData.linkedin} | `}
          {formData.portfolio && `Portfolio: ${formData.portfolio}`}
        </p>

        <h2>SUMMARY</h2>
        <p>
          {formData.summary ||
            "A short professional summary highlighting your career goals and strengths."}
        </p>

        <h2>EDUCATION</h2>
        {formData.education?.map((edu, i) => (
          <div key={i} className="resume-item">
            <strong>{edu.degree}</strong> — {edu.school} (
            {formatDate(edu.startDate)} -{" "}
            {edu.endDate ? formatDate(edu.endDate) : "Present"})
          </div>
        ))}

        <h2>SKILLS</h2>
        <ul>
          {formData.skills
            ? formData.skills
                .split(",")
                .map((s, i) => <li key={i}>{s.trim()}</li>)
            : "No skills added"}
        </ul>

        <h2>WORK EXPERIENCE</h2>
        {formData.experience?.map((exp, i) => (
          <div key={i} className="resume-item">
            <strong>{exp.position}</strong> — {exp.company} (
            {formatDate(exp.startDate)} -{" "}
            {exp.endDate ? formatDate(exp.endDate) : "Present"})
            <ul>
              {exp.description
                ?.split("\n")
                .map((d, idx) => <li key={idx}>{d.trim()}</li>)}
            </ul>
          </div>
        ))}

        <h2>PROJECTS</h2>
        {formData.projects?.map((proj, i) => (
          <div key={i} className="resume-item">
            <strong>{proj.title}</strong>{" "}
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noreferrer">
                (Link)
              </a>
            )}
            <ul>
              {proj.description
                ?.split("\n")
                .map((d, idx) => <li key={idx}>{d.trim()}</li>)}
            </ul>
          </div>
        ))}

        <h2>CERTIFICATIONS</h2>
        {formData.certifications?.map((cert, i) => (
          <div key={i} className="resume-item">
            <strong>{cert.name}</strong> — {cert.issuer} (
            {formatDate(cert.date)})
          </div>
        ))}

        <h2>AWARDS & ACHIEVEMENTS</h2>
        {formData.awards?.map((award, i) => (
          <div key={i} className="resume-item">
            <strong>{award.title}</strong> — {award.organization} (
            {formatDate(award.date)})
          </div>
        ))}

        <h2>LANGUAGES</h2>
        {formData.languages?.map((lang, i) => (
          <div key={i} className="resume-item">
            <strong>{lang.name}</strong> — {lang.proficiency}
          </div>
        ))}
      </div>

      <div className="download-section">
        <button className="button-modern" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;
