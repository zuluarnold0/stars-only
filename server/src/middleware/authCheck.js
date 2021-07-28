const admin = require('../../firebase');

const authCheck = async (req, res, next) => {
    try {
        //get token string
        const token = req.headers.authorization.replace('Bearer ', '');

        if (!token) 
            return res.status(401).json({ message: 'Please authenticate.' });

        //verify fb token using firebase-admin
        const firebaseUser = await admin.auth().verifyIdToken(token);
        if (!firebaseUser) 
            return res.status(401).json({ message: 'Your token is invalid. Please authenticate' });

        req.email = firebaseUser.email;
        next();
    }
    catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = authCheck;