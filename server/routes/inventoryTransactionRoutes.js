const express = require('express')
const validateTokenHandler = require('../middleware/validateTokenHandler')
const roleMiddleware = require('../middleware/roleMiddleware')
const { createInventoryTransaction } = require('../controllers/createInventoryTransactionController')

const router = express.Router()

router.route('/').post(validateTokenHandler, createInventoryTransaction)

module.exports = router