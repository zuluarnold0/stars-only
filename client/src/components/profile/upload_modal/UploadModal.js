import React from 'react';
import { motion } from 'framer-motion';

import './UploadModal.css';

const UploadModal = ({ children }) => {
    return (
        <motion.div className="upload-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="upload-modal-content"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                { children }
            </motion.div>
        </motion.div>
    )
}

export default UploadModal;

