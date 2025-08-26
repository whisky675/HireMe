const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");;
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
connectDB();
console.log("Loaded GROQ_API_KEY:", process.env.GROQ_API_KEY ? "✅ Present" : "❌ Missing");

const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

app.get("/", (_, res) => res.send("ATS Backend Running"));

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
