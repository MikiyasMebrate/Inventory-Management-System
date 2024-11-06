const mongoose = require('mongoose');

const notificationPreferenceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiveSaleNotifications: {
        type: Boolean,
        default: true
    },
    receiveRestockNotifications: {
        type: Boolean,
        default: true
    },
    receiveReturnNotifications: {
        type: Boolean,
        default: true
    },
    receiveProductNotifications: {
        type: Boolean,
        default: true
    },
    receiveCategoryNotifications: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('NotificationPreference', notificationPreferenceSchema);
