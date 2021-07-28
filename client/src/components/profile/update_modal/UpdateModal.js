//packages
import React from 'react';

//local
import './UpdateModal.css';

const UpdateModal = ({ children, closeModal }) => {
    //close modal if the modal background is clicked not the content
    const handleClick = (e) => {
        if (e.target.classList.contains("update-modal")) {
            closeModal()
        }
    }

    return (
        <div className="update-modal" onClick={handleClick} >
            <div className="update-modal-content">
                <span 
                    onClick={() => closeModal()} 
                    className="update-modal-close">&times;
                </span>
                { children }
            </div>
        </div>
    )
}

export default UpdateModal;
