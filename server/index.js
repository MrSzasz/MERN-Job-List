const express = require('express');
const app = express();
require("dotenv").config()

const port = process.env.PORT

app.get('/', (req, res) =>{
res.send("hi")
})

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});