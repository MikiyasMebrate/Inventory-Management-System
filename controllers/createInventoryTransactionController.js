const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const createNotification = require("../services/notificationService")
const Product = require('../models/productModel')
const InventoryTransaction = require('../models/inventoryTransactionModel')



/**
 * @desc create inventoryTransaction
 * @route POST /api/inventory-transactions
 * @access private
 */

const createInventoryTransaction = [
    // Validate product ID
    check('product')
        .notEmpty().withMessage('Product ID is required.')
        .isMongoId().withMessage('Invalid Product ID format.'),

    // Validate action type
    check('actionType')
        .notEmpty().withMessage('Action type is required.')
        .isIn(['sale', 'restock', 'return']).withMessage('Invalid action type. Must be sale, restock, or return.'),

    // Validate quantity
    check('quantity')
        .notEmpty().withMessage('Quantity is required.')
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer.'),

    // Validate priceAtTransaction
    check('priceAtTransaction')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price cannot be negative.')
        .custom((value, { req }) => {
            if (req.body.actionType === 'restock' && (value === undefined || value === null)) {
                throw new Error('priceAtTransaction is required when actionType is "restock".');
            }
            return true;
        }),

    // Middleware to handle the request after validation
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { product, actionType, quantity, priceAtTransaction } = req.body;

        // Get the product record
        const productRecord = await Product.findById(product);

        if (!productRecord) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Role-based access control for restocking
        if (actionType === 'restock') {
            if (req.user.role !== 'storekeeper') {
                return res.status(403).json({ message: "Forbidden: You do not have the required permissions to restock!" });
            }
            if (!priceAtTransaction) {
                return res.status(400).json({ message: 'priceAtTransaction is required when restocking.' });
            }
        }

        // Check stock level for sales
        if (actionType === 'sale' && productRecord.quantityInStock < quantity) {
            return res.status(400).json({ message: "Quantity should be less than or equal to quantity in stock!" });
        }

        // Create a new inventory transaction
        const transaction = await InventoryTransaction.create({
            user: req.user.id, // Assuming req.user.id contains the authenticated user's ID
            product: productRecord._id,
            actionType,
            quantity,
            priceAtTransaction,
        });

        if (!transaction) {
            return res.status(400).json({ message: 'Failed to create inventory transaction' });
        }

        // Update product quantity based on action type
        switch (actionType) {
            case 'sale':
                productRecord.quantityInStock -= quantity;
                createNotification(`Product sold: ${productRecord.name}, Quantity: ${quantity}`)
                break;
            case 'restock':
                productRecord.quantityInStock += Number(quantity);
                productRecord.price = priceAtTransaction
                createInventoryTransaction(`Product restocked: ${productRecord.name}, Quantity: ${quantity}, New Price: ${priceAtTransaction}`)
                break;
            case 'return':
                productRecord.quantityInStock += Number(quantity);
                createNotification(`Product returned: ${productRecord.name}, Quantity: ${quantity}`)
                break;
            default:
                return res.status(400).json({ message: 'Invalid action type' });
        }

        // Save the updated product record
        await productRecord.save();

        // Respond with the created transaction and updated product details
        res.status(201).json({
            transaction,
            updatedProduct: productRecord,
        });
    })
];

module.exports = createInventoryTransaction;


module.exports = {
    createInventoryTransaction
};