const Resume = require("../models/Resume");
const { extractTextFromUpload, stripPII } = require("../utils/fileParser");
const { scoreWithGroq } = require("../services/atsService");
exports.analyze = async (req, res) => {
  try {
    console.log("🔹 Received analyze request");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { jobTitle = "", jobDescription = "", resumeText = "" } = req.body;

    // Either a file upload or plain text
    const sanitizedText = req.file
      ? await extractTextFromUpload(req.file)
      : stripPII(resumeText);

    if (!sanitizedText || sanitizedText.length < 50) {
      console.error("Resume content too short or missing.");
      return res.status(400).json({ message: "Resume content is too short or missing." });
    }

    console.log("Sanitized Resume Text (first 200 chars):", sanitizedText.slice(0, 200));

    const ai = await scoreWithGroq({
      resumeText: sanitizedText,
      jobTitle,
      jobDescription
    });

    if (!ai) {
      console.error("Groq returned null/undefined.");
      return res.status(500).json({ message: "AI scoring failed." });
    }

    console.log("AI Response:", ai);

   
    const doc = await Resume.create({
      rawText: sanitizedText,
      fileName: req.file ? req.file.originalname : undefined,
      jobTitle,
      jobDescription,
      atsScore: ai.atsScore,
      strengths: ai.strengths || [],
      improvements: ai.improvements || [],
      missingKeywords: ai.missingKeywords || [],
      sectionCompleteness: ai.sectionCompleteness || {},
      reasoning: ai.reasoning || ""
    });

    res.json(doc);
  } catch (err) {
    console.error("ATS analyze error:", err);
    res.status(500).json({ message: "Server error analyzing resume.", error: err.message });
  }
};

