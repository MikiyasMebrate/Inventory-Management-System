const express = require('express')
const { getCategories, createCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/categoryController")
const validateTokenHandler = require('../middleware/validateTokenHandler')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router()

router.route('/')
    .get(validateTokenHandler, getCategories)
    .post(validateTokenHandler, createCategory)

router.route('/:id')
    .put(
        validateTokenHandler,             // Token validation middleware
        roleMiddleware(['admin']),  // Role-based access control
        updateCategory                    // The controller function for the update
    )
    .delete(
        validateTokenHandler,
        roleMiddleware(['admin']),
        deleteCategory
    )
    .get(
        validateTokenHandler,
        getCategory
    )

module.exports = router