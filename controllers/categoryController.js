const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel")


//@desc Get all categories
//@route GET /api/category
//@access private
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.status(200).json(categories)
})

//@desc add  category
//@route POST /api/category
//@access private
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


        //check if the product is available
        const productAvailable = await Category.findOne({ name });
        if (productAvailable) {
            res.status(400);
            throw new Error("Category already registered!");
        }

        const category = await Category.create({ name, description, icon })
        if (category) {
            res.status(200).json(category)
        } else {
            res.status(400)
            throw new Error("category data is not valid")
        }

    })
]


//@desc add  category
//@route POST /api/category/id
//@access private
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

        console.log("user-----", req.user)

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated element
        )

        res.status(200).json(updatedCategory)
    })
]


module.exports = {
    getCategories,
    createCategory,
    updateCategory
}