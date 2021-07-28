const express = require('express');
const router = new express.Router();

const User = require('../models/user');
const Profile = require('../models/profile');
const Post = require('../models/post');
const auth = require('../middleware/auth');

/** fetch users */
router.get('/users', auth, async (req, res) => {
    try {
            // find following users
            const users = req.user.followings.map(async(id) => {
                return await User.findOne({ _id: id });
            });

            if (!users)
                return res.status(404).json({ message: 'No users found!' });
        
            // find following users profile
            const usersProfile = users.map(async(user) => {
                const profile = await Profile.findOne({ userId: user._id });
                return {
                    ...user,
                    bio: profile.bio,
                    location: profile.location,
                    gender: profile.gender
                }
            });

            res.status(200).json({ users: usersProfile });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server Error' });
    }
});
/*
 * USER
 */
router.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'No user found!' });
            
        res.status(200).json({ user });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

/*
 * FOLLOWINGS
 */
router.get('/users/:id/followings', async (req, res) => {
    try {
            // find followed user
            const user = await User.findOne({ _id: req.params.id });
            if (!user)
                return res.status(404).json({ message: 'No user found!' });
        
            // find following users
            const users = user.followings.map(async(id) => {
                return await User.findOne({ _id: id });
            });

            if (!users)
                return res.status(404).json({ message: 'No users found!' });
        
            // find following users profile
            const usersProfile = users.map(async(user) => {
                const profile = await Profile.findOne({ userId: user._id });
                return {
                    ...user,
                    bio: profile.bio,
                    location: profile.location,
                    gender: profile.gender
                }
            });

            res.status(200).json({ followings: usersProfile });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error' });
    }
});

/*
 * SEARCHED USERS
 */
router.get('/users/search/:searchterm', auth, async (req, res) => {
    try {
        const users = await User.find({ firstname: req.params.searchterm });
        if (!users)
            return res.status(400).json({ message: 'No users found!' });

        const usersProfile = users.map(async(user) => {
            const profile = await Profile.findOne({ userId: user._id });
            return {
                ...user,
                bio: profile.bio,
                location: profile.location,
                gender: profile.gender
            }
        })
        res.status(200).json({ users: usersProfile });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error' });
    }
});


/* delete users */
router.delete('/users', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ userId: req.user._id });
        await User.findOneAndRemove({ _id: req.user._id });
        await Post.findOneAndRemove({ authorId: req.user._id });
        
        res.status(200).json({ message: 'User deleted' });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

