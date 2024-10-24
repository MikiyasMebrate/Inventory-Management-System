const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel')
const InventoryTransaction = require('../models/inventoryTransaction')


/**
 * @desc create inventoryTransaction
 * @route POST /api/inventory-transactions
 * @access private
 */
const createInventoryTransaction = []