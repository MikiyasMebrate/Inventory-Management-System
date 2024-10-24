const express = require('express')
const { searchCategory } = require('../controllers/searchController')

const router = express.Router()

router.route('/category').get(searchCategory)
module.exports = router