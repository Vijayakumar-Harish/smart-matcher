import client from "../config/openai.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import Match from "../models/Match.js";
// import { uploadToS3 } from "../utils/s3.js"; // optional
import dotenv from "dotenv";
dotenv.config();

export async function matchResume(req, res) {
  try {
    const { jobDescription, saveResume } = req.body;
    if (!jobDescription)
      return res.status(400).json({ error: "jobDescription required" });
    if (!req.file)
      return res.status(400).json({ error: "resume file required" });

    // 1. Extract resume text
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // 2. (Optional) Upload resume to S3 if desired
    let resumeUrl = null;
    // if (process.env.AWS_S3_BUCKET && saveResume === "true") {
    //   resumeUrl = await uploadToS3(
    //     req.file.buffer,
    //     req.file.originalname,
    //     req.file.mimetype
    //   );
    // }

    // 3. Build prompt for OpenAI
    const prompt = `
You are a smart resume analyzer. Given a candidate resume and a job description, produce a JSON object with:
- "score": an integer 0-100 representing how well the resume matches.
- "missingSkills": a list of short strings (skills not present in the resume).
- "suggestions": a list of 3-6 concise improvement suggestions.

Return only valid JSON — no markdown, no explanations.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    // 4. Call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.0,
      max_tokens: 800,
    });

    let raw =
      response.choices?.[0]?.message?.content ??
      response.choices?.[0]?.text ??
      "";

    // 5. Clean AI response (remove markdown fences, trim)
    const cleaned = raw
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    // 6. Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("❌ Failed to parse AI response:", raw);
      return res.status(500).json({
        error: "AI returned non-JSON response",
        raw,
      });
    }

    // 7. Ensure proper types
    const score = Math.max(0, Math.min(100, Number(parsed.score) || 0));
    const missingSkills = Array.isArray(parsed.missingSkills)
      ? parsed.missingSkills.map(String)
      : [];
    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions.map(String)
      : [];

    // 8. Save match history
    const match = new Match({
      user: req.user._id,
      jobDescription,
      resumeText: resumeText.slice(0, 20000),
      resumeUrl,
      score,
      missingSkills,
      suggestions,
    });

    await match.save();

    // 9. Send clean JSON response
    res.json({ match });
  } catch (e) {
    console.error("❌ matchResume error:", e);
    res.status(500).json({ error: e.message || "Internal server error" });
  }
}


export async function getMatches(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const matches = await Match.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Match.countDocuments({ user: req.user._id });

    res.json({
      meta: { page, limit, total },
      data: matches,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getMatchById(req, res) {
  try {
    const match = await Match.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).lean();
    if (!match) return res.status(404).json({ error: "Not found" });
    res.json({ match });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
