const express = require('express')
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('../controllers/userController')
const roleMiddleware = require('../middleware/roleMiddleware')
const validateTokenHandler = require('../middleware/validateTokenHandler')

const router = express.Router()

router.route('/register').post(validateTokenHandler, roleMiddleware(['admin']), registerUser)
router.route('/login').post(loginUser)
router.route('/').get(validateTokenHandler, getAllUsers)
router.route('/:id')
    .delete(validateTokenHandler, roleMiddleware(['admin']), deleteUser)
    .put(validateTokenHandler, updateUser)



module.exports = router