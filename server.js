import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve public folder
app.use(express.static(path.join(process.cwd(), "public")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Groq API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Generate Resume Route
app.post("/generate-resume", async (req, res) => {

  try {

    const {
      name,
      title,
      email,
      phone,
      location,
      skills,
      education,
      projects,
      linkedin,
    } = req.body;

    const prompt = `
Create a professional resume.

Name: ${name}
Title: ${title}
Email: ${email}
Phone: ${phone}
Location: ${location}
LinkedIn: ${linkedin}

Skills: ${skills}
Education: ${education}
Projects: ${projects}

Generate:
- Professional Summary
- Skills
- Education
- Projects
- Career Objective
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response.choices[0].message.content;

    res.json({
      resume: result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });

  }

});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});