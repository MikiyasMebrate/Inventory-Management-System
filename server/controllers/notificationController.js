const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification")

/**
 * @desc Get user notification preference
 * @route GET /api/notifications/preference
 * @access public
 */
const getNotification = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ user: req.user.id }).populate({
        path: 'user',
        select: 'firstName lastName'
    })

    if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: "No notifications found!" });
    }

    res.status(200).json(notifications)
})

module.exports = {
    getNotification
}