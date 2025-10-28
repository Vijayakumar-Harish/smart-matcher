import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import matcherRoutes from "./routes/matcher.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api", authRoutes);
app.use("/api", matcherRoutes);

// Basic health check
app.get("/", (req, res) => res.json({ status: "ok" }));

// Error handler (simple)
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: "Internal server error" });
});

export default app;