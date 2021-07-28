const express = require('express');
const router = new express.Router();

const Profile = require('../models/profile');
const auth = require('../middleware/auth');

/** FETCH PROFILE **/
router.get('/profile/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ userId: req.user._id });
        if (!profile)
            return res.status(401).json({ message: 'There is no profile for this user' });
        
        res.status(200).json({ 
            user: {
                ...req.user,
                gender: profile.gender,
                location: profile.location,
                bio: profile.bio
            }
        });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error' });
    }
});


/** follow user */
router.post('/user/:id/follow', auth, async (req, res) => {
    try {
        if (req.user._id === req.params.id) {
            return res.status(403).json({ message: 'Sorry you cannot follow yourself' });
        }
        const userToFollow = await User.findOne({ _id: req.params.id });

        await userToFollow.updateOne({
            $push: {
                followers: req.user._id
            }
        })

        await userToFollow.updateOne({
            $push: {
                following: req.params.id
            }
        })
        res.status(200).json({ user: userToFollow });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

/** unfollow user */
router.post('/user/:id/unfollow', auth, async (req, res) => {
    try {
        const userToUnfollow = await User.findOne({ _id: req.params.id });

        await userToUnfollow.updateOne({
            $pull: {
                followers: req.user._id
            }
        })
        await userToUnfollow.updateOne({
            $pull: {
                following: req.params.id
            }
        })
        res.status(200).json({ user: userToUnfollow });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

/** UPDATE PROFILE **/
router.put('/user/profile', auth, async (req, res) => {
    
    try {
        const { firstname, lastname, bio, gender, location } = req.body;
        if (!gender || !firstname || !lastname || !bio || !location )
            return res.status(400).json({ message: 'All fields are required!' });

        const updates = { bio, gender, location };
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user._id },
            { $set: updates },
            { new: true }
        );

        if (!profile)
            return res.status(400).json({ message: 'Failed to update. Please try again later!' });

        const savedProfile = await profile.save();

        req.user.firstname = firstname;
        req.user.lastname = lastname;
        await req.user.save();
        
        res.status(200).json({ 
            currentUser: {
                ...req.user,
                bio: savedProfile.bio,
                location: savedProfile.location,
                gender: savedProfile.gender
            } 
        });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/user/profile/email', auth, async (req, res) => {
    const { email } = req.body;
    try {
        req.user.email = email;
        await req.user.save();

        res.status(200).json({ message: 'Your email was updated successfully' });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/profile/upload-profile-image', auth, async (req, res) => {
    try {
        //grab url from request body and set to profile cover
        const { url } = req.body;
        req.user.profile_pic = url;

        //save user
        const savedUser = await req.user.save();

        //respond with updated profile
        res.status(200).json({ 
            currentUser: {
                ...req.user,
                profile_pic: savedUser.profile_pic
            }
        });
    }
    catch(e) {
        //console.log(e);
    }
});

router.post('/profile/upload-cover-image', auth, async (req, res) => {
    try {
        //grab url from request body and set to profile cover
        const { url } = req.body;
        req.user.profile_cover = url;
        
        //save user
        const savedUser = await req.user.save();

        //send updated user profile
        res.status(200).json({ 
            currentUser: {
                ...req.user,
                profile_cover: savedUser.profile_cover
            }
        });
    }
    catch(e) {
        res.status(500).json({ message: 'Error encountered while uploading your cover image. Please try again later' });
    }
});

module.exports = router;