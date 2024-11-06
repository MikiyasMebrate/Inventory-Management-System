const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')
const Category = require("../models/categoryModel")
const Product = require("../models/productModel")

/**
 * @desc Get search categories
 * @route GET /api/search/category?cat=
 * @access private
 */
const searchCategory = asyncHandler(async (req, res) => {
    const { cat } = req.query; // Get the search term from query parameters

    try {
        const nameRegex = new RegExp(cat, 'i'); // Case-insensitive regex for the name

        // Construct the query
        const query = {
            $or: [
                { name: nameRegex }, // Search by name
                { _id: mongoose.isValidObjectId(cat) ? cat : null } // Search by ID only if valid
            ]
        };

        // Perform the search
        const categories = await Category.find(query).lean();

        // Check if any categories were found
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found matching the search term." });
        }

        // Return the found categories
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
});


/**
 * @desc Get search products by category name
 * @route GET /api/search/category?cate=
 * @access private
 */
const searchProduct = asyncHandler(async (req, res) => {
    const { product } = req.query; // Get the search term from query parameters

    try {
        const nameRegex = new RegExp(product, 'i'); // Case-insensitive regex for the name

        // Construct the query
        const query = {
            $or: [
                { name: nameRegex }, // Search by name
                { _id: mongoose.isValidObjectId(product) ? product : null } // Search by ID only if valid
            ]
        };

        // Perform the search
        const products = await Product.find(query).lean();

        // Check if any categories were found
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching the search term." });
        }

        // Return the found categories
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
});

/**
 * @desc Get search products by name or category name
 * @route GET /api/search/product?product=
 * @access private
 */
const searchProductByCategoryName = asyncHandler(async (req, res) => {
    const { cat } = req.query;

    try {
        const nameRegex = new RegExp(cat, 'i');

        // First, search for categories that match the search term
        const matchingCategories = await Category.find({ name: nameRegex }).lean();


        // Extract category IDs from matching categories
        const categoryIds = matchingCategories.map(category => category._id);

        // Construct the query
        const query = {
            $or: [
                { category: { $in: categoryIds } } // Search by category ID
            ]
        };

        // Perform the search
        const products = await Product.find(query).populate('category').lean(); // Populate category to include category details

        // Check if any products were found
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching the search term." });
        }

        // Return the found products
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
});




module.exports = {
    searchCategory,
    searchProduct,
    searchProductByCategoryName

}