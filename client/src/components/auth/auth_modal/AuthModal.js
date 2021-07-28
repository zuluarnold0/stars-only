//packages
import React from 'react';
import { motion } from 'framer-motion';

//local
import './AuthModal.css';

/**NB: u can use react-toastify package */
//modal for auth alert messages
const AuthModal = ({ children }) => {
    return (
        <motion.div className="auth-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="auth-modal-content"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                { children }
            </motion.div>
        </motion.div>
    )
}

export default AuthModal;

