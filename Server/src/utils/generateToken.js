const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: '1d',
    })
};

module.exports = generateToken;