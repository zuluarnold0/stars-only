const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    recepientId: {
        type: String
    },
    senderId: {
        type: String
    },
    postId: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    alertType: {
        type: String
    }
},{
    timestamps: true
})

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;