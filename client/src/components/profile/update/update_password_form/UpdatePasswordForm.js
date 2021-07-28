//packages
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//local
import './UpdatePasswordForm.css';
import { clearProfileMsgsAction, updatePasswordAction } from '../../../../store/actions/profileAction';

const UpdatePasswordForm = ({ setShowUpdatePasswordModal }) => {

    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    
    const token = window.sessionStorage.getItem('token');

    const submitPasswordForm = useDispatch();
    const clearMsgs = useDispatch();

    const message = useSelector((state) => state.profile.update_password_message);
    const isLoading = useSelector((state) => state.profile.update_password_isLoading);

    setTimeout(() => {
        if (message.length > 0) {
            clearMsgs(clearProfileMsgsAction());
            if (message.includes('success')) {
                setShowUpdatePasswordModal(false);
            }
        }
    }, 4000);

    const messageClass = (message, str) => {
        return message.includes(str) ? 'update-password-alert-success' : 'update-password-alert-failure-msg';
    }

    const handleFormSubmit = () => {
        submitPasswordForm(updatePasswordAction({ token, oldPassword, newPassword }))
    }

    const isButtonDisabled = loading => loading ? 'update-password-btn-disabled' : 'update-password-btn';
    
    return (
        <div className="update-password-form">
            <h3 className="update-password-header">Update Profile Password</h3>
            {
                message ? 
                    <p className={messageClass(message, 'success')}>{ message }</p>
                    : ''
            }
            <div>
                <label>Old Password</label><br/>
                <input
                    type="text" 
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New Password</label><br/>
                <input
                    type="text" 
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button
                className={isButtonDisabled(isLoading)}
                type="submit"
                onClick={() => handleFormSubmit()}
                disabled={isLoading}
            > Update </button>
        </div>
    )
}

export default UpdatePasswordForm;