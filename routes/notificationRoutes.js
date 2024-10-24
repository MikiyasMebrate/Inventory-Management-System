const express = require('express')
const validateTokenHandler = require('../middleware/validateTokenHandler')
const { getNotifications } = require('../controllers/notificationController')

const router = express.Router()

router.route('/').get(validateTokenHandler, getNotifications)

module.exports = router