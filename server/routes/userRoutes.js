const express = require('express');
const { mainTestController } = require('../controllers/userControllers');
const router = express.Router()

router.get("/", mainTestController)

module.exports = router