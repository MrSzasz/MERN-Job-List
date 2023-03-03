const {
    jobs_createNewJob,
    jobs_getJobsFromDataBase,
    jobs_updateJobOnDatabase,
    job_deleteJobOnDatabase
} = require('../controllers/jobsControllers');

const express = require('express');
const {
    validateToken
} = require('../middlewares/validateToken');
const router = express.Router();


// Create new job in database

router.post("/", validateToken, jobs_createNewJob)


// Get all jobs

router.get("/", validateToken, jobs_getJobsFromDataBase)


// Update job in database

router.put("/", jobs_updateJobOnDatabase)


// Delete job in database

router.delete("/", job_deleteJobOnDatabase)

module.exports = router