
require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function buildPrompt({ resumeText, jobTitle = "", jobDescription = "" }) {
  
  const truncatedText = resumeText.slice(0, 3000);

  return `
You are an enterprise-grade ATS. Score resumes realistically using common ATS heuristics:
- Keyword match vs. job description
- Section completeness (Summary, Skills, Experience, Education, Projects)
- Action verbs & measurable impact
- Formatting (bullets, dates, consistency)
- Length, clarity, grammar

Return ONLY valid JSON with this exact shape:
{
  "atsScore": <integer 0-100>,
  "strengths": [ "<string>", ... ],
  "improvements": [ "<string>", ... ],
  "missingKeywords": [ "<string>", ... ],
  "sectionCompleteness": {
    "Summary": <0-100>,
    "Skills": <0-100>,
    "Experience": <0-100>,
    "Education": <0-100>,
    "Projects": <0-100>
  },
  "reasoning": "<1 short paragraph>"
}

JobTitle: ${jobTitle || "Not provided"}
JobDescription: ${jobDescription || "Not provided"}

Resume (sanitized, no personal info):
${truncatedText}
`;
}


function tryParseJson(text) {
  if (!text) return null;

  // Match fenced JSON blocks (with or without "json")
  const fence = text.match(/```(?:json)?([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : text.trim();

  try {
    return JSON.parse(candidate);
  } catch {
    // Try grabbing last {...} block
    const lastObj = text.match(/\{[\s\S]*\}$/);
    if (lastObj) {
      try {
        return JSON.parse(lastObj[0]);
      } catch {}
    }
  }
  return null;
}


async function scoreWithGroq({ resumeText, jobTitle, jobDescription }) {
  const prompt = buildPrompt({ resumeText, jobTitle, jobDescription });

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a strict ATS scoring engine." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const text = chatCompletion.choices?.[0]?.message?.content || "";

    const parsed = tryParseJson(text);

    if (!parsed || typeof parsed.atsScore !== "number") {
      console.log("Raw AI output (parse failed):", text);
      throw new Error("JSON parse failed");
    }

    
    parsed.atsScore = Math.max(0, Math.min(100, Math.round(parsed.atsScore)));

    // Clamp each section completeness
    if (parsed.sectionCompleteness) {
      for (let key in parsed.sectionCompleteness) {
        parsed.sectionCompleteness[key] = Math.max(
          0,
          Math.min(100, Math.round(parsed.sectionCompleteness[key]))
        );
      }
    } else {
      parsed.sectionCompleteness = {
        Summary: 50,
        Skills: 50,
        Experience: 50,
        Education: 50,
        Projects: 50,
      };
    }

    parsed.strengths = Array.isArray(parsed.strengths) ? parsed.strengths : [];
    parsed.improvements = Array.isArray(parsed.improvements)
      ? parsed.improvements
      : [];
    parsed.missingKeywords = Array.isArray(parsed.missingKeywords)
      ? parsed.missingKeywords
      : [];

  
    parsed.reasoning = parsed.reasoning || "";

    return parsed;
  } catch (err) {
    return {
      atsScore: 50,
      strengths: [],
      improvements: ["Could not parse structured response. Please try again."],
      missingKeywords: [],
      sectionCompleteness: {
        Summary: 50,
        Skills: 50,
        Experience: 50,
        Education: 50,
        Projects: 50,
      },
      reasoning: "Fallback because JSON parse failed.",
    };
  }
}

module.exports = { scoreWithGroq };
