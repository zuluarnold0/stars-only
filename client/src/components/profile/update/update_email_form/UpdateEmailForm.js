//packages
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//local
import './UpdateEmailForm.css';
import { clearProfileMsgsAction, updateUserEmailAction } from '../../../../store/actions/profileAction';

const UpdateEmailForm = ({ setShowUpdateEmailModal }) => {
    
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const token = window.sessionStorage.getItem('token');

    const submitUpdateEmailForm = useDispatch();
    const clearMsgs = useDispatch();

    const email_message = useSelector((state) => state.profile.email_message);
    const email_isLoading = useSelector((state) => state.profile.email_isLoading);

    setTimeout(() => {
        if (email_message.length > 0) {
            clearMsgs(clearProfileMsgsAction());
            if (email_message.includes('success')) {
                setShowUpdateEmailModal(false);
            }
        }
    }, 4000);

    const messageClass = (message, str) => {
        return message.includes(str) ? 'update-email-alert-success' : 'update-email-alert-failure-msg';
    }

    const handleFormSubmit = () => {
        submitUpdateEmailForm(updateUserEmailAction({ token, email, password }))
    }

    const isButtonDisabled = loading => loading ? 'update-email-btn-disabled' : 'update-email-btn';

    return (
        <div className="update-email-form">
            <h3 className="update-email-header">Update Email</h3>
            {
                email_message ? 
                    <p className={messageClass(email_message, 'success')}>{ email_message }</p>
                    : ''
            }
            <div>
                <label>Enter New Email</label><br/>
                <input
                    type="text" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Enter Current Password</label><br/>
                <input
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className={isButtonDisabled(email_isLoading)}
                type="submit"
                onClick={() => handleFormSubmit()}
                disabled={email_isLoading}
            > Update </button>
        </div>
    )
}

export default UpdateEmailForm;

