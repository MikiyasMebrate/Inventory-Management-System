const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel')
const Category = require("../models/categoryModel")
const NotificationPreference = require('../models/notificationPreference')
const User = require("../models/userModel")
const createNotification = require("../services/notificationService")

/**
 * @desc Get all products
 * @route GET /api/product
 * @access private
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate({
        path: 'category',
        select: 'name'
    })
    res.status(200).json(products)
})

/**
 * @desc add product
 * @route POST /api/product
 * @access private
 */
const createProduct = [
    // Validate category (ensure it's a valid ObjectId)
    check('category')
        .notEmpty().withMessage('Please select a category')
        .isMongoId().withMessage('Invalid category ID'),

    // Validate name
    check('name')
        .notEmpty().withMessage('Please add Product name')
        .isLength({ max: 300 }).withMessage('Product name cannot exceed 100 characters'),

    // Validate description (optional, but has max length)
    check('description')
        .optional()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

    // Validate price
    check('price')
        .notEmpty().withMessage('Please add Product Price')
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

    // Validate quantityInStock
    check('quantityInStock')
        .notEmpty().withMessage('Please add Product quantity in stock')
        .isInt({ min: 0 }).withMessage('Quantity cannot be negative'),

    // Validate isActive (optional, default is true)
    check('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean'),
    check('images')
        .isArray().withMessage('Images must be an array')
        .custom((value) => {
            if (value.length > 0) {
                const validUrlPattern = /^(http|https):\/\/[^ "]+$/; // Simple URL validation
                for (let url of value) {
                    if (!validUrlPattern.test(url)) {
                        throw new Error(`Invalid image URL: ${url}`);
                    }
                }
            }
            return true; // If all checks pass
        }),
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check if the product is available
        const productAvailable = await Product.findOne({ name: req.body.name });
        if (productAvailable) {
            res.status(400);
            throw new Error("Product already registered!");
        }

        const category = await Category.findById(req.body.category)
        if (!category) {
            res.status(404);
            throw new Error("Category not found!");
        }

        const product = await Product.create(req.body)

        if (product) {

            //notification
            const users = await User.find()
            for (const user of users) {
                const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

                // Check if the user wants product notifications
                if (preferences && preferences.receiveProductNotifications) {
                    await createNotification(user._id, `New Product added: ${product.name}`); // Add notification
                }
            }

            const populatedProduct = await product.populate({
                path: 'category',
                select: 'name',
            })

            res.status(201).json(populatedProduct);


        } else {
            res.status(400)
            throw new Error("product data is not valid")
        }

    })
]


/**
 * @desc remove product
 * @route Delete /api/product/id
 * @access private
 */
const deleteProduct = asyncHandler(async (req, res) => {
    let product = null
    try {
        product = await Product.findById(req.params.id)
    } catch {
        product = null
    }


    if (!product) {
        res.status(404)
        throw new Error("Product not found!")
    }

    await product.deleteOne()
    //notification
    const users = await User.find()
    for (const user of users) {
        const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

        // Check if the user wants product notifications
        if (preferences && preferences.receiveProductNotifications) {
            await createNotification(user._id, `Product deleted: ${product.name}`); // Add notification
        }
    }
    res.status(200).json(product)
})

/**
 * @desc update product
 * @route PUT /api/product/id
 * @access private
 */
const updateProduct = [
    // Validate category (ensure it's a valid ObjectId)
    check('category')
        .notEmpty().withMessage('Please select a category')
        .isMongoId().withMessage('Invalid category ID'),

    // Validate name
    check('name')
        .notEmpty().withMessage('Please add Product name')
        .isLength({ max: 100 }).withMessage('Product name cannot exceed 100 characters'),

    // Validate description (optional, but has max length)
    check('description')
        .optional()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

    // Validate price
    check('price')
        .notEmpty().withMessage('Please add Product Price')
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

    // Validate quantityInStock
    check('quantityInStock')
        .notEmpty().withMessage('Please add Product quantity in stock')
        .isInt({ min: 0 }).withMessage('Quantity cannot be negative'),

    // Validate isActive (optional, default is true)
    check('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean'),
    check('images')
        .optional()
        .isArray().withMessage('Images must be an array')
        .custom((value) => {
            if (value.length > 0) {
                const validUrlPattern = /^(http|https):\/\/[^ "]+$/; // Simple URL validation
                for (let url of value) {
                    if (!validUrlPattern.test(url)) {
                        throw new Error(`Invalid image URL: ${url}`);
                    }
                }
            }
            return true; // If all checks pass
        }),
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404)
            throw new Error("Product not Found!")
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        //notification
        const users = await User.find()
        for (const user of users) {
            const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

            // Check if the user wants product notifications
            if (preferences && preferences.receiveProductNotifications) {
                await createNotification(user._id, `Product updated: ${updatedProduct.name}`); // Add notification
            }
        }

        const populatedProduct = await updatedProduct.populate({
            path: 'category',
            select: 'name',
        })

        res.status(200).json(populatedProduct)
    })
]

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
}