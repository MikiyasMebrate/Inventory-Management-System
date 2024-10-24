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
    .post(validateTokenHandler, roleMiddleware(['storekeeper']), createProduct)

router.route('/:id')
    .delete(validateTokenHandler, roleMiddleware(['storekeeper']), deleteProduct)
    .put(validateTokenHandler, roleMiddleware(['storekeeper']), updateProduct)


module.exports = router