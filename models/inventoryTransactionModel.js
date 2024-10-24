const mongoose = require('mongoose')

const inventoryTransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    actionType: {
        type: String,
        enum: ['sale', 'restock', 'return'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    priceAtTransaction: {
        type: Number,
        min: [0, 'Price cannot be negative'], // Custom error message for price
    },
},
    {
        timestamps: true
    }
)


// Pre-save hook to validate priceAtTransaction
inventoryTransactionSchema.pre('save', function (next) {
    // Check if actionType is 'restock'
    if (this.actionType === 'restock' && (this.priceAtTransaction === undefined || this.priceAtTransaction === null)) {
        return next(new Error('priceAtTransaction is required when action is "restock".'));
    }
    next();
});


module.exports = mongoose.model('InventoryTransaction', inventoryTransactionSchema);