import React, { useState } from "react";
import "../Styles/ATS.css";
import Navbar from "./Navbar";
import "../Styles/Navbar.css"

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setScoreData(null); // reset when uploading new file
  };

  const calculateScore = async () => {
    if (!file) return alert("Please upload a resume first!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      // Optionally pass job details
      formData.append("jobTitle", "Software Engineer");
      formData.append("jobDescription", "We are hiring a full-stack developer...");

      const res = await fetch("http://localhost:5000/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Backend response:", data);
      setScoreData(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while checking your resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-container">
      <h2>ATS Checker</h2>
      <p>Upload your resume to get an ATS score!</p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="file-input"
      />

      <button className="ats-button" onClick={calculateScore}>
        {loading ? "Checking..." : "Check ATS Score"}
      </button>

      {scoreData && (
        <div className="score-result">
          <h3>Your ATS Score: {scoreData.atsScore}%</h3>
          <p><strong>Strengths:</strong> {scoreData.strengths?.join(", ")}</p>
          <p><strong>Improvements:</strong> {scoreData.improvements?.join(", ")}</p>
          <p><strong>Missing Keywords:</strong> {scoreData.missingKeywords?.join(", ")}</p>
          <p><strong>Reasoning:</strong> {scoreData.reasoning}</p>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
