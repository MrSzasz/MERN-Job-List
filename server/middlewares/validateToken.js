const jwt = require('jsonwebtoken');
const secretKeyForJWT = process.env.JWT_SECRET_KEY_FOR_ENCRYPT

function validateToken(req, res, next) {
    const tokenFromUser = req.headers["x-access-token"] // Get the token from the header


    if (!tokenFromUser) {

        // If there is no token

        return res.status(401).json({ // Status code 401 = Not authorized
            auth: false,
            token: null,
            popUpMessage: "Token not provided",
        })
    }

    // Verify the token with JWT

    jwt.verify(tokenFromUser, secretKeyForJWT, (err, data) => {
        if (err) return res.status(401).json({ // Status code 401 = Not authorized
            message: "Invalid token"
        })

        req.userData = data
        
        next()
    })
}

module.exports = {
    validateToken
}