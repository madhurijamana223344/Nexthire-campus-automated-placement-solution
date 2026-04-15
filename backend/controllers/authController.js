import User from "../models/User.js";

export const signup = async(req, res) => {
    try {
        console.log("BODY:", req.body); // ✅ DEBUG

        const { name, email, password, role } = req.body;

        // ✅ VALIDATION
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required ❌" });
        }

        // ✅ CHECK EXISTING USER
        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "Email already exists ❌" });
        }

        // ✅ CREATE USER
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.json({ message: "Signup successful ✅", user });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ message: "Server error ❌" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required ❌" });
        }

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials ❌" });
        }

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error ❌" });
    }
};