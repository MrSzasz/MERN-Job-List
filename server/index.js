const express = require('express');
const app = express();
require("dotenv").config()
const userRoutes = require("./routes/userRoutes")

const port = process.env.PORT

app.use('/users', userRoutes)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});