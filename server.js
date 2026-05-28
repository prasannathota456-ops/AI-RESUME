import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    res.json({ resume: result });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});