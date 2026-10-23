const jwt = require('jsonwebtoken')
const User = require("../models/users")

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists."
            })
        }

        if (!user.isActive) {
            return res.status(403).json ({
                success:false,
                message: "Your account has been blocked"
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Auth middleware error:", error.message)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        })
    }
}

module.exports = authMiddleware
