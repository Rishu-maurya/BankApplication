const express = require('express');
const router = express.Router();

const { registerUser, loginUser, } = require("../controllers/auth.controller")

const authMiddleware = require('../middlewares/auth.middleware')
const roleCheck = require ('../middlewares/rolecheck.middleware')

router.post("/register", registerUser);
router.post("/login", loginUser);

// temprory test

router.get('/admin-test', authMiddleware, roleCheck) ,(req, res) => {
    res.status(200).json({
        success: true, message:'Welcom Admin'
    })
}

module.exports = router;

