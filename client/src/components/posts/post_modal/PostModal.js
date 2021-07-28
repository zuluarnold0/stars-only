import React from 'react';
import { motion } from 'framer-motion';

import './PostModal.css';

const PostModal = ({ children }) => {
    return (
        <motion.div className="post-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="post-modal-content"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                { children }
            </motion.div>
        </motion.div>
    )
}

export default PostModal;

