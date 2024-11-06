const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add category name']
    },
    description: {
        type: String
    },
    icon: {
        type: String
    },
})


module.exports = mongoose.model('Category', categorySchema)