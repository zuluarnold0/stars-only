//packages
const express = require('express');
const router = new express.Router();

//middleware
const authCheck = require('../middleware/auth');

//models
const Profile = require('../models/profile');
const User = require('../models/user');

/* SIGNUP USER */
router.post('/auth/signup', authCheck, async (req, res) => {

    try {
        //get data from request body
        const { firstname, lastname } = req.body;

        //check if they is a user on database with this email
        let user = await User.findOne({ email: req.email });

        if (user) {
            //if user is found update user data
            user = { ...user, firstname, lastname, email: req.email };
            await user.save;
            return res.status(200).json({ message: 'Your update was successful.' });
        }
            
        //create user on mongo using email from firebase
        const createUser = new User({ firstname, lastname, email: req.email });
        const savedUser = await createUser.save();

        //initialize profile for the created user
        const profile = new Profile({ userId: savedUser._id });
        await profile.save();

        res.status(201).json({ message: 'Your registration was successful.' });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

