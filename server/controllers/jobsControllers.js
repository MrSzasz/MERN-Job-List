const jwt = require('jsonwebtoken')
const jobModel = require("../models/jobs")
const userModel = require("../models/user")
const secretKeyForJWT = process.env.JWT_SECRET_KEY_FOR_ENCRYPT

module.exports = {

    // Create a new job on the database

    jobs_createNewJob: (req, res) => {
        try {
            const job = new jobModel(req.body)
            job.save((err, result) => {
                if (err) console.error(err)
                res.send(result);
            })

            /*
            
            res.cookie("token", tokenWithInfo) ==> Saves the token in the cookie
            
            */
        } catch (err) {
            console.log(err)
            res.status(409).json({
                message: err.message
            })
        }
    },


    //  Get all jobs from the database

    jobs_getJobsFromDataBase: (req, res) => {
        try {
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

                // If the token is valid

                userModel.findById(
                    data.id, (err, user) => {

                        // If the user is not found

                        if (err) return res.status(404).json({
                            popUpMessage: "Error retrieving jobs from database",
                            dataError: err
                        })

                        // If the user is found

                        res.status(200).send(user.jobs)
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

    // Update a job on the database

    jobs_updateJobOnDatabase: (req, res) => {
        try {
            jobModel.findByIdAndUpdate(req.body._id,
                req.body,
                (err) => {
                    if (err) console.error(err);
                    res.send("job updated successfully!")
                })
        } catch (err) {
            console.log(err)
            res.status(409).json({
                message: err.message
            })
        }
    },

    // Delete a job on the database

    job_deleteJobOnDatabase: (req, res) => {
        try {
            jobModel.findByIdAndDelete(req.body.id, (err, data) => {
                if (err) console.error(err);
                res.status(201).json({
                    status: "success"
                })
            })
        } catch (err) {
            console.log(err)
            res.status(409).json({
                message: err.message
            })
        }
    },
}