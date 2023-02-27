module.exports = {

    // Create a new user on the database

    users_createNewUser: (req, res) => {
        console.log(req.body)
        res.send("hi, post")
    },


    //  Find a user on the database

    users_getUserFromDataBase: (req, res) => {
        console.log(req.body)
        res.send("hi, get")
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