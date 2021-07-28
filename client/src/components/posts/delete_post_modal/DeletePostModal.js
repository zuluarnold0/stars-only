import React from 'react';
import { motion } from 'framer-motion';

import './DeletePostModal.css';
import { useDispatch } from 'react-redux';
import { clearPostMessageAction } from '../../../store/actions/postsAction';

const DeletePostModal = props => {

    const clear = useDispatch();

    setTimeout(() => {
        if (props.delete_post_message.length > 0) {
            clear(clearPostMessageAction());
            props.closeDeletePostModal();
        }
    }, 4000);

    const isButtonDisabled = loading => {
        return loading ? 'delete-post-modal-content-options-delete-disabled' : 'delete-post-modal-content-options-delete';
    }
    
    const messageClass = (message, str) => {
        return message.includes(str) ? 'delete-post-alert-success' : 'delete-post-alert-failure-msg';
    }

    return (
        <motion.div 
            className="delete-post-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="delete-post-modal-content"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                <h3
                    className='delete-post-modal-content-heading'
                >Delete Post</h3>
                {
                    props.delete_post_message ? 
                    <p className={messageClass(props.delete_post_message, 'Post deleted')}>
                        {props.delete_post_message}
                    </p> : ''
                }
                <hr/>
                <div className='delete-post-modal-content-message'>
                    <div>Are you sure you want to delete this post?</div>
                </div>
                <hr />
                <div className='delete-post-modal-content-options'>
                    <button
                        className={isButtonDisabled(props.delete_post_isloading)}
                        onClick={() => props.deletePost()}
                        disabled={props.delete_post_isloading}
                    >Delete</button>
                    <button 
                        className='delete-post-modal-content-options-cancel'
                        onClick={() => props.closeDeletePostModal()} 
                    >Cancel</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default DeletePostModal;
