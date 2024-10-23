const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please add user first name!']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please add user last name!']
    },
    email: {
        type: String,
        trim: true,
        requires: [true, 'Please add user email!'],
        unique: [true, 'Email already taken!']
    },
    about: {
        type: String,
    },
    role: {
        type: String,
        enum: ['salesperson', 'storekeeper', 'customer']
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
})

module.exports = mongoose.model('User', userSchema)