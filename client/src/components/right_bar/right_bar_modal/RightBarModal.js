import React from 'react';
import { motion } from 'framer-motion';

import './RightBarModal.css';

const RightBarModal = ({ children }) => {
    return (
        <motion.div className="right-bar-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="right-bar-modal-content"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                { children }
            </motion.div>
        </motion.div>
    )
}

export default RightBarModal;

