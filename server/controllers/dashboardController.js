const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const InventoryTransaction = require("../models/inventoryTransactionModel")


/**
 * @desc Get dashboard
 * @route GET /api/dashboard
 * @access private
 */
const getDashboard = asyncHandler(async (req, res) => {

    //count dashboarrd
    const categoryCount = await Category.countDocuments({});
    const userCount = await User.countDocuments({});
    const productCount = await Product.countDocuments({});
    const totalQuantity = await Product.aggregate([
        {
            $group: {
                _id: null, // Group by null to get a single result
                totalQuantity: { $sum: "$quantityInStock" } // Summing up the `quantityInStock` field
            }
        }
    ]);

    //top categories 
    const topCategories = await Category.aggregate([
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
            }
        },
        {
            $sort: { productCount: -1 } // Sort in descending order based on productCount
        },
        {
            $limit: 5 // Limit the result to 5
        }
    ]);

    const topProducts = await InventoryTransaction.aggregate([
        {
            $match: { actionType: 'sale' },
        },
        {
            $group: {
                _id: '$product', // Group by product ID
                totalSold: { $sum: '$quantity' }, // Sum the quantities
            },
        },
        {
            $sort: { totalSold: -1 },
        },
        {
            $limit: 10,
        },
        {
            $lookup: {
                from: 'products', // Collection name for Product model
                localField: '_id', // Field in InventoryTransaction
                foreignField: '_id', // Field in Product model
                as: 'productDetails', // Result array field
            },
        },

        {
            $unwind: '$productDetails',
        },
        {
            $lookup: {
                from: 'categories', // Collection name for Category model
                localField: 'productDetails.category', // Field in Product model referencing Category
                foreignField: '_id', // Field in Category model
                as: 'categoryDetail', // Result array field
            },
        },
        {
            $unwind: '$categoryDetail',
        },
        {
            $project: {
                _id: 0, // Exclude the default _id field
                productName: '$productDetails.name', // Include product name
                price: '$productDetails.price', // Include product price
                category: '$categoryDetail.name', // Include product category
                totalSold: 1, // Include total quantity sold
            },
        },
    ]);

    res.status(200).json({
        "dashboard": { categoryCount, userCount, productCount, totalQuantity },
        "topCategories": topCategories,
        "topProducts": topProducts
    })
})

module.exports = {
    getDashboard
};