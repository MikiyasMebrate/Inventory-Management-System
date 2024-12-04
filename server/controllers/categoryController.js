const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const createNotification = require("../services/notificationService")
const NotificationPreference = require('../models/notificationPreference')


/**
 * @desc Get all categories
 * @route GET /api/category
 * @access private
 */
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.aggregate([
        {
            $lookup: {
                from: 'products', // The collection name of the Product model
                localField: '_id', // The field in Category to match
                foreignField: 'category', // The field in Product referencing the Category
                as: 'products', // The alias for the joined data
            },
        },
        {
            $project: {
                name: 1, // Include the category name
                description: 1, // Include the category description
                icon: 1, // Include the category icon
                productCount: { $size: '$products' }, // Count the number of products in the array
            },
        },
    ]);
    res.status(200).json(categories)
})


/**
 * @desc add  category
 * @route POST /api/category
 * @access private
 */
const createCategory = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters long"),
    check("description")
        .optional()
        .isLength({ min: 5 })
        .withMessage("description must be at least 5 characters long"),
    check("icon")
        .optional(),
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //get elements
        const { name, description, icon } = req.body


        //check if the category is available
        const categoryAvailable = await Category.findOne({ name });
        if (categoryAvailable) {
            res.status(400);
            throw new Error("Category already registered!");
        }

        const category = await Category.create({ name, description, icon })
        if (category) {
            // Retrieve all users and their notification preferences
            const users = await User.find()
            for (const user of users) {
                const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

                // Check if the user wants category notifications
                if (preferences && preferences.receiveCategoryNotifications) {
                    await createNotification(user._id, `New category added: ${category.name}`); // Add notification
                }
            }

            res.status(201).json(category)
        } else {
            res.status(400)
            throw new Error("category data is not valid")
        }

    })
]

/**
 * @desc Get category
 * @route GET /api/category/id
 * @access private
 */
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (!category) {
        res.status(404)
        throw new Error("Category not found!")
    }

    res.status(200).json(category)
})

/**
 * @desc update  category
 * @route PUT /api/category/id
 * @access private
 */
const updateCategory = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters long"),
    check("description")
        .optional()
        .isLength({ min: 5 })
        .withMessage("description must be at least 5 characters long"),
    check("icon")
        .optional(),
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const category = await Category.findById(req.params.id)
        if (!category) {
            res.status(404)
            throw new Error("Category not Found!")
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated element
        )

        //notification
        const users = await User.find()
        for (const user of users) {
            const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

            // Check if the user wants category notifications
            if (preferences && preferences.receiveCategoryNotifications) {
                await createNotification(user._id, `Category updated: ${updatedCategory.name}`); // Add notification
            }
        }


        res.status(200).json(updatedCategory)
    })
]

/**
 * @desc delete  category
 * @route DELETE /api/category/id
 * @access private
 */
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (!category) {
        res.status(404)
        throw new Error("Category not found!")
    }

    await category.deleteOne()

    //notification
    const users = await User.find()
    for (const user of users) {
        const preferences = await NotificationPreference.findOne({ user: user._id }).lean();

        // Check if the user wants category notifications
        if (preferences && preferences.receiveCategoryNotifications) {
            await createNotification(user._id, `Category deleted: ${category.name}`); // Add notification
        }
    }
    res.status(200).json(category)
})

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
}