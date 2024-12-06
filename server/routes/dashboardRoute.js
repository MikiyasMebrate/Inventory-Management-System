const express = require('express')
const { getDashboard } = require("../controllers/dashboardController")
const validateTokenHandler = require('../middleware/validateTokenHandler')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router()

router.route('/')
    .get(validateTokenHandler, getDashboard)

module.exports = router