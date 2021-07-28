const admin = require('../../firebase');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        //get firebase token
        const token = req.headers.authorization.replace('Bearer ', '');
        
        if (!token) 
            return res.status(401).json({ message: 'Please authenticate' });

        //verify fb token
        const firebaseUser = await admin.auth().verifyIdToken(token);
        if (!firebaseUser) 
            return res.status(403).json({ message: 'Sorry your token is invalid' });

        //find mongo-user using fb-token
        const user = await User.findOne({ email: firebaseUser.email });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        
        req.user = user;
        next();
    }
    catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = auth;