const express = require('express')
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/').get(validateToken, getAllUsers)


module.exports = router