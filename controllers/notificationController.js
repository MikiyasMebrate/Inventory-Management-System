const Notification = require('../models/NotificationModel')
const asyncHandler = require("express-async-handler");

/**
 * @desc Get all notifications
 * @route GET /api/notifications
 * @access public
 */
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(notifications);
});

module.exports = {
    getNotifications
}