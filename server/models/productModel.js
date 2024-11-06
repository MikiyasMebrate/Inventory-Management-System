const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    name: {
        type: String,
        required: [true, 'Please add Product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: 'No description available',
    },
    price: {
        type: Number,
        required: [true, 'Please add Product Price'],
        min: [0, 'Price cannot be negative'],
        validate: {
            validator: Number.isFinite,
            message: '{VALUE} is not a valid price'
        }
    },
    quantityInStock: {
        type: Number,
        required: [true, 'Please add Product quantity in stock'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    images: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Product', productSchema)