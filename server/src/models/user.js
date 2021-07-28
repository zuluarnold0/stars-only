const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    profile_pic: {
        type: String,
        default: ''
    },
    profile_cover: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;