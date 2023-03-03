const jobModel = require("../models/jobs")
const userModel = require("../models/user");


module.exports = {

    // Create a new job on the database

    jobs_createNewJob: (req, res) => {
        try {
            userModel.findById(req.userData.id, (err, user) => {
                if (!user) return res.status(404).json({
                    popUpMessage: "User not found",
                    dataError: err
                })

                user.jobs.push(req.body)

                user.save()

                res.status(200).json({
                    popUpMessage: "Job added successfully"
                })
            })

            // const job = new jobModel(req.body)
            // job.save((err, result) => {
            //     if (err) console.error(err)
            //     res.send(result);
            // })

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
            userModel.findById(
                req.userData.id, (err, user) => { // req.userData = response from the middleware

                    // If the user is not found

                    if (err) return res.status(404).json({
                        popUpMessage: "Error retrieving jobs from database",
                        dataError: err
                    })

                    // If the user is found

                    res.status(200).send(user.jobs)
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