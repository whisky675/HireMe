import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import ResumeForm from "./Components/ResumeForm";
import ResumePreview from "./Components/ResumePreview";
import Footer from "./Components/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ATSChecker from "./Components/ATS";


function App() {
  const [formData, setFormData] = useState({
    name: "", title: "", email: "", phone: "", location: "",
    linkedin: "", portfolio: "", skills: "", summary: "",
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    education: [{ school: "", degree: "", startDate: "", endDate: "", details: "" }],
    projects: [{ title: "", link: "", description: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],
    awards: [{ title: "", organization: "", date: "" }],
    languages: [{ name: "", proficiency: "" }]
  });

  return (
    <Router>
      {/* 👇 Navbar Links */}
      <Navbar/>
      <nav style={{ display: "flex", gap: "20px", padding: "20px", background: "#f5f5f5" }}>
        <Link to="/">Home</Link>
        <Link to="/ats">ATS Checker</Link>
      </nav>

      <Routes>
        {/* Main resume builder page */}
        <Route
          path="/"
          element={
            <div className="app">
              <Navbar />
              <main className="main-container">
                <section className="form-pane">
                  <ResumeForm formData={formData} setFormData={setFormData} />
                </section>

                <aside className="preview-pane">
                  <ResumePreview formData={formData} />
                </aside>
              </main>
              <Footer />
            </div>
          }
        />

        {/* ATS Checker page */}
        <Route path="/ats" element={<ATSChecker />} />
      </Routes>
    </Router>
  );
}

export default App;
