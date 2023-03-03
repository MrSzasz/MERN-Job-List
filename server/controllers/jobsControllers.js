const jobModel = require("../models/jobs")
const userModel = require("../models/user");


module.exports = {

    // Create a new job on the database

    jobs_createNewJob: (req, res) => {
        try {

            // Search for the user with the given token 

            userModel.findById(req.userData.id, (err, user) => {
                // if the user is not found 

                if (!user) return res.status(404).json({
                    popUpMessage: "User not found",
                    dataError: err
                })

                // Push the new job onto the user list

                user.jobs.push(req.body)

                // And save the modified user

                user.save(err => {
                    if (err) return res.status(500).json({
                        popUpMessage: "Error saving job, please try again later",
                        dataError: err
                    })
                })

                // Return the success response and message

                res.status(201).json({ // Status code 201 = created successfully
                    popUpMessage: "Job added successfully"
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

                    res.status(200).send(user)
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
            userModel.findById(
                req.userData.id, (err, user) => { // req.userData = response from the middleware

                    // If the user is not found

                    if (err) return res.status(404).json({
                        popUpMessage: "Error retrieving jobs from database",
                        dataError: err
                    })

                    // If the user is found

                    user.jobs[ // In the array
                        user.jobs.findIndex((job) => job.id === req.body.id) // Find the job by id
                    ] = req.body; // And replace it with the modified array 

                    user.save(err => {
                        if (err) return res.status(500).json({
                            popUpMessage: "Error editing job, please try again later",
                            dataError: err
                        })
                    })

                    // Return the success response and message

                    res.status(200).json({
                        popUpMessage: "Job edited successfully"
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

    // Delete a job on the database

    job_deleteJobOnDatabase: (req, res) => {
        try {
            userModel.findById(
                req.userData.id, (err, user) => { // req.userData = response from the middleware

                    // If the user is not found

                    if (err) return res.status(404).json({
                        popUpMessage: "Error retrieving jobs from database",
                        dataError: err
                    })

                    // If the user is found

                    user.jobs = user.jobs.filter((job) => job.id !== req.body.jobID)

                    user.save(err => {
                        if (err) return res.status(500).json({
                            popUpMessage: "Error deleting job, please try again later",
                            dataError: err
                        })
                    })

                    // Return the success response and message

                    res.status(200).json({
                        popUpMessage: "Job deleted successfully"
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
}