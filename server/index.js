const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
const jobsRoutes = require("./routes/jobsRouter")
app.use(cors())

const port = process.env.PORT

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))


app.use('/users', userRoutes)
app.use('/jobs', jobsRoutes)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});