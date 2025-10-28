import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next) {
    try {
        const header = req.header("Authorization");
        if (!header) return res.status(401).json({ error: "Authentication required" });

        const token = header.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) throw new Error();

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).json({ error: "Please authenticate." });
    }
}