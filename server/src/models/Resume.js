const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    rawText: { type: String, required: true }, 
    fileName: String,
    jobTitle: String,
    jobDescription: String,

    atsScore: Number,
    strengths: [String],
    improvements: [String],
    missingKeywords: [String],
    sectionCompleteness: {}, 
    reasoning: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
