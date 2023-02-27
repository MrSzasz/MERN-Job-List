const jobModel = require("../models/jobs")

module.exports = {

    // Create a new job on the database

    jobs_createNewJob: (req, res) => {
        try {
            const job = new jobModel(req.body)
            job.save((err, result) => {
                if (err) console.error(err)
                res.send(result);
            })
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
                    message: "error getting jobs from database"
                })
                res.status(200).send(jobs)
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
            // console.log(req.body)
            // res.send(req.body)
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