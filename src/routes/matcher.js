import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import { matchResume, getMatches, getMatchById } from "../controllers/matcherController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/match", auth, upload.single("resume"), matchResume);
router.get("/matches", auth, getMatches);
router.get("/matches/:id", auth, getMatchById);

export default router;