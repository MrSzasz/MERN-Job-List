const jwt = require('jsonwebtoken')
const jobModel = require("../models/jobs")
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
            jobModel.find((err, jobs) => {
                if (err) return res.status(404).json({
                    message: "Error getting jobs from database"
                })

                const tokenFromUser = req.headers["x-access-token"]

                if (!tokenFromUser) return res.status(404).json({
                    auth: false,
                    message: "No token provided"
                })

                // console.log(tokenFromUser);

                try {
                    const decodedToken = jwt.verify(tokenFromUser, secretKeyForJWT)

                    // Get jobs from DataBase 

                    jobModel.find((err, jobs) => {
                        if (err) return res.status(404).json({
                            message: "Error getting jobs from DataBase"
                        })
                        res.status(200).cookies("test", "test").json({
                            userId: decodedToken.id,
                            auth: true,
                            jobs
                        })
                    })
                } catch (err) {
                    console.log(err.message);
                    res.status(404).json({
                        auth: false,
                        error: err.message,
                        message: "Invalid token"
                    });
                }

                // console.log(verifiedToken);

                // if (verifiedToken) {
                //     return res.status(404).json({
                //         auth: false,
                //         message: "Error verifying token"
                //     })
                // }
                // res.status(200).send(jobs)
            })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: err.message
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