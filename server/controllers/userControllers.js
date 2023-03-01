const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const secretKeyForJWT = process.env.JWT_SECRET_KEY_FOR_ENCRYPT

module.exports = {

    // Create a new user on the database

    users_createNewUser: (req, res) => {
        try {
            const user = new userModel(req.body)
            user.save((err, userResult) => {
                if (err) {
                    return res.status(500).json({
                        message: "The email is already in use"
                    })
                }
                const token = jwt.sign({
                    id: userResult._id
                }, secretKeyForJWT, {
                    expiresIn: 60 * 60 * 24 * 30 // 30 days
                })
                res.status(200).cookie("testcookie", token).json({
                    auth: true,
                    token
                });
            })
        } catch (err) {
            console.log(err)
            res.status(409).send(err)
        }
    },


    //  Find a user on the database

    users_getUserFromDataBase: (req, res) => {
        try {
            userModel.findOne({
                email: req.query.email
            }, (err, user) => {
                if (err) return res.status(400).send({
                    message: err.message
                })
                bcrypt.compare(req.query.password, user.password, function (error, isMatch) {
                    if (error) {
                        throw error
                    } else if (!isMatch) {
                        res.status(500).send("Password doesn't match!")
                    } else {
                        res.status(200).send(user)
                    }
                })
            })
        } catch (err) {
            console.log(err)
            res.status(409).send(err)
        }
    },

    // Update a user on the database

    users_updateUserOnDatabase: (req, res) => {
        console.log(req.body)
        res.send("hi, put")
    },

    // Delete a user on the database

    users_deleteOneUserOnDatabase: (req, res) => {
        console.log(req.body)
        res.send("hi, delete")
    },
}