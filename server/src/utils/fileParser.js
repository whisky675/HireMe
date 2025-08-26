const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

function stripPII(text) {
  if (!text) return "";

  let t = text;

  t = t.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "[redacted-email]");
  t = t.replace(/(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?){2,4}\d{2,4}/g, "[redacted-phone]");
  t = t.replace(/https?:\/\/\S+|www\.\S+/gi, "[redacted-url]");

  t = t
    .split(/\r?\n/)
    .filter(
      (line) =>
        !/^\s*(name|address|phone|email|linkedin|github|portfolio)\s*[:\-]/i.test(
          line.trim()
        )
    )
    .join("\n");

  return t.trim();
}

async function extractTextFromUpload(file) {
  if (!file) return "";

  const mime = file.mimetype;
  const path = file.path;

  try {
    if (mime === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(path));
      return stripPII(data.text || "");
    }

    if (
      mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ path });
      return stripPII(data.value || "");
    }

    if (mime === "text/plain") {
      const data = fs.readFileSync(path, "utf8");
      return stripPII(data || "");
    }

    const data = fs.readFileSync(path, "utf8");
    return stripPII(data || "");
  } finally {
    try {
      fs.unlink(path, () => {});
    } catch (_) {}
  }
}

module.exports = { extractTextFromUpload, stripPII };
