const jwt = require('jsonwebtoken')
const USer = require("../models/users")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            })
        }

        const token = authHeader.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')

        const user = await User.findByID(decoded.id).select('-password')
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not longer exists."
            })
        }
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        })
    }
}

const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    })
}

module.exports = authMiddleware, getMe
