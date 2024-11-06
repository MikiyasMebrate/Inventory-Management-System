const express = require('express')
const { searchCategory, searchProduct, searchProductByCategoryName } = require('../controllers/searchController')

const router = express.Router()

router.route('/category').get(searchCategory)
router.route('/product').get(searchProduct)
router.route('/product-cat-name').get(searchProductByCategoryName)
module.exports = router