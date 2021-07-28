const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        trim: true,
        default: ''
    }
},{
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;