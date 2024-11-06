const express = require('express')
const validateTokenHandler = require('../middleware/validateTokenHandler')
const {
    userNotificationPreference,
    createUserNotificationPreference,
    updateUserNotificationPreference
} = require('../controllers/notificationPreferenceController')

const router = express.Router()

router.route('/')
    .get(validateTokenHandler, userNotificationPreference)
    .post(validateTokenHandler, createUserNotificationPreference)
    .put(validateTokenHandler, updateUserNotificationPreference)

module.exports = router