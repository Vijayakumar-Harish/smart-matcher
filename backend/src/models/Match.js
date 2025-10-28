import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobDescription: { type: String, required: true },
    resumeText: { type: String }, // optionally store extracted text
    resumeUrl: { type: String },
    score: { type: Number },
    missingSkills: { type: [String], default: [] },
    suggestions: { type: [String], default: [] }
}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);
export default Match;