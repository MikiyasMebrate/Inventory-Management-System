const Notification = require('../models/notification')

const createNotification = async (user, message) => {
    await Notification.create({
        user: user._id,
        message,
        read: false,
        createdAt: new Date(),
    });
};

module.exports = createNotification