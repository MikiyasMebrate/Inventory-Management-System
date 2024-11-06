const NotificationPreference = require('../models/notificationPreference')
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");


/**
 * @desc Get user notification preference
 * @route GET /api/notifications/preference
 * @access public
 */
const userNotificationPreference = asyncHandler(async (req, res) => {
    const preferences = await NotificationPreference.findOne({ user: req.user.id });

    if (!preferences) {
        return res.status(404).json({ message: 'Notification preferences not found' });
    }

    res.json(preferences);
})

/**
 * @desc create user notification preference
 * @route POST /api/notifications/preference
 * @access public
 */
const createUserNotificationPreference = [
    check('receiveSaleNotifications')
        .isBoolean(),
    check('receiveRestockNotifications')
        .isBoolean(),
    check('receiveReturnNotifications')
        .isBoolean(),
    check('receiveProductNotifications')
        .isBoolean(),
    check('receiveCategoryNotifications')
        .isBoolean(),
    asyncHandler(async (req, res) => {

        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const preferences = await NotificationPreference.findOne({ user: req.user.id });

        if (preferences) {
            res.status(400);
            throw new Error("notification preference already registered!");
        }

        const notificationPreference = await NotificationPreference.create({
            user: req.user.id,
            ...req.body
        })

        if (notificationPreference) {
            res.status(201).json(notificationPreference)
        } else {
            res.status(400)
            throw new Error("Notification Preference data is not valid")
        }

    })
]


/**
 * @desc update user notification preference
 * @route PUT /api/notifications/preference
 * @access public
 */
const updateUserNotificationPreference = [
    check('receiveSaleNotifications')
        .isBoolean(),
    check('receiveRestockNotifications')
        .isBoolean(),
    check('receiveReturnNotifications')
        .isBoolean(),
    check('receiveProductNotifications')
        .isBoolean(),
    check('receiveCategoryNotifications')
        .isBoolean(),
    asyncHandler(async (req, res) => {
        // Get validation result from request
        const errors = validationResult(req);

        // If there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const preference = await NotificationPreference.findOne({ user: req.user.id });

        if (!preference) {
            return res.status(404).json({ message: "Preference not found!" });
        }

        const updatedPreference = await NotificationPreference.findByIdAndUpdate(
            preference.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPreference)

    })
]



module.exports = {
    userNotificationPreference,
    createUserNotificationPreference,
    updateUserNotificationPreference
}