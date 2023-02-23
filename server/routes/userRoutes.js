const express = require('express');
const {
    users_createNewUser,
    users_getUserFromDataBase,
    users_updateUserOnDatabase,
    users_deleteOneUserOnDatabase
} = require('../controllers/userControllers');
const router = express.Router()


// Get all users 

router.get("/", users_getUserFromDataBase)


// Create a new user

router.post("/", users_createNewUser)


// Edit an existing user

router.put("/", users_updateUserOnDatabase)


// Delete a user

router.delete("/", users_deleteOneUserOnDatabase)

module.exports = router