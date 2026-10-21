const User = require("../models/users");

const roleCheck = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !allowedRoles.includes(req.user.role)) {
                return res.status(403).json ({
                    success:false,
                    message: 'Access denied. you do not have permissin to perform this action.'
                })
            }
            next();
        } catch (error) {
            console.error("Role Check Error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

module.exports = roleCheck;