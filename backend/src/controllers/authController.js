import User from "../models/User.js";

export async function register(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (e) {
        if (e.code === 11000) return res.status(400).json({ error: "Email already in use" });
        res.status(400).json({ error: e.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = user.generateAuthToken();
        res.json({ user, token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export async function me(req, res) {
    res.json(req.user);
}