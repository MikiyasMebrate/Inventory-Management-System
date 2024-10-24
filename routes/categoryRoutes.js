const express = require('express')
const { getCategories, createCategory, updateCategory } = require("../controllers/categoryController")
const validateTokenHandler = require('../middleware/validateTokenHandler')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router()

router.route('/').get(validateTokenHandler, getCategories).post(validateTokenHandler, createCategory)
router.route('/update/:id').put(
    validateTokenHandler,             // Token validation middleware
    roleMiddleware(['storekeeper']),  // Role-based access control
    updateCategory                    // The controller function for the update
);

module.exports = router