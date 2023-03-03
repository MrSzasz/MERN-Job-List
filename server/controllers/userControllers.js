const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const secretKeyForJWT = process.env.JWT_SECRET_KEY_FOR_ENCRYPT

module.exports = {

    // Create a new user on the database

    users_createNewUser: (req, res) => {
        try {
            const user = new userModel(req.body)
            user.save((err, userResult) => { // Save the user and return error or user
                if (err) {
                    return res
                        .status(500) // Status code 500 = internal server error
                        .json({
                            popUpMessage: "The email is already in use",
                            dataError: err
                        })
                }

                // Token creation 

                const token = jwt.sign({
                    id: userResult._id, // Data in token for the front end
                    email: userResult.email,
                    createdAt: userResult.createdAt,
                    color: userResult.color
                }, secretKeyForJWT, { // Secret key for encryption
                    expiresIn: 60 * 60 * 24 * 7 // Expires in 7 days
                })

                // Response to front end

                res.status(201) // Status code 201 = created successfully 
                    .json({
                        auth: true, // Auth for store in local storage or cookie
                        token // Token with info for storing in local storage or cookie
                    });
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({
                popUpMessage: "Something went wrong, please try again later",
                dataError: err
            })
        }
    },


    //  Find a user on the database

    users_getUserFromDataBase: (req, res) => {
        try {

            // Search for the user in the database

            userModel.findOne({
                email: req.query.email // With the user's email address
            }, (err, user) => {
                // If the data is not found 

                if (!user) return res.status(404).json({
                    popUpMessage: "Invalid email or password",
                    dataError: err
                })

                // Compare the password from the user and the password in the database

                bcrypt.compare(req.query.password, user.password, function (err, isMatch) {
                    if (err) {
                        res.status(500).json({
                            popUpMessage: "Error with password authentication",
                            dataError: err
                        })
                        throw err
                    } else if (!isMatch) {
                        return res.status(500).json({
                            popUpMessage: "Invalid email or password",
                            dataError: err
                        })
                    } else {
                        // If the password is correct

                        const token = jwt.sign({ // Generates a new token
                            id: user.id
                        }, secretKeyForJWT, {
                            expiresIn: 60 * 60 * 24 * 7
                        })

                        // Send the token and authorization to the frontend

                        res.status(200).json({
                            auth: true,
                            token
                        })
                    }
                })
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({
                popUpMessage: "Something went wrong, please try again later",
                dataError: err
            })
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