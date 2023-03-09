const jwt = require('jsonwebtoken');
const secretKeyForJWT = process.env.JWT_SECRET_KEY_FOR_ENCRYPT

function validateToken(req, res, next) {
    const tokenFromUser = req.headers["authorization"] // Get the token from the header

    if (!tokenFromUser) {

        // If there is no token

        return res.status(401).json({ // Status code 401 = Not authorized
            auth: false,
            token: null,
            popUpMessage: "Invalid token",
        })
    }

    // Verify if the token is encoded with Bearer authentication

    if (typeof tokenFromUser !== undefined || tokenFromUser !== "undefined") {
        // Verify the token with JWT

        const decodedToken = tokenFromUser.split(" ")[1] // Remove the "Bearer" from the token


        jwt.verify(decodedToken, secretKeyForJWT, (err, data) => {
            if (err) return res.status(401).json({ // Status code 401 = Not authorized
                message: "Invalid token"
            })

            req.userData = data

            next()
        })
    } else {
        return res.status(401).json({ // Status code 401 = Not authorized
            auth: false,
            token: null,
            popUpMessage: "Invalid token",
        })
    }

}

module.exports = {
    validateToken
}