const Notification = require('../models/NotificationModel')

const createNotification = async (message) => {
    await Notification.create({ message });
};

module.exports = createNotification