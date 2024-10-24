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
        // Create a regex to match category names, ignoring case
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


module.exports = {
    searchCategory
}