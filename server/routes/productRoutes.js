const express = require('express')
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController')
const validateTokenHandler = require('../middleware/validateTokenHandler')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router()

router.route('/')
    .get(validateTokenHandler, getProducts)
    .post(validateTokenHandler, roleMiddleware(['storekeeper', 'admin']), createProduct)

router.route('/:id')
    .delete(validateTokenHandler, roleMiddleware(['admin']), deleteProduct)
    .put(validateTokenHandler, roleMiddleware(['storekeeper', 'admin']), updateProduct)


module.exports = router