const User = require("../models/users.js");
const generateToken = require("../utils/generateToken.js");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const safeRole = ["user", "staff", "manager", "admin"].includes(role) ? role : "user";

        const newUser = await User.create({
            fullName, email, password: hashedPassword, phone, role: safeRole
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                token: generateToken(newUser._id),
            });
        } else {
            res.status(400).json({ message: "Invalide user data" });
        }

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            _id: userExist._id,
            fullName: userExist.fullName,
            email: userExist.email,
            phone: userExist.phone,
            role: userExist.role,
            token: generateToken(userExist._id), // यहाँ नया टोकन जेनरेट होगा
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {registerUser, loginUser}
