const express = require('express')
const validateTokenHandler = require('../middleware/validateTokenHandler')
const { getNotification } = require("../controllers/notificationController")

const router = express.Router()

router.route('/').get(validateTokenHandler, getNotification)

module.exports = router