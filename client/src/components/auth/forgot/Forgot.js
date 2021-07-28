//packages
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//local
import AuthModal from '../auth_modal/AuthModal';
import { clearMessagesAction } from '../../../store/actions/authAction';
import { forgotPasswordAction } from '../../../store/actions/authAction';
import './Forgot.css';

const Forgot = () => {
    //state of input fields
    const [ email, setEmail ] = useState('');
    
    //data from redux state
    const message = useSelector((state) => state.auth.message);
    const isLoading = useSelector((state) => state.auth.isLoading);

    //clear error messages after 4 sec
    const clear = useDispatch();
    setTimeout(() => {
        if (message.length > 0) {
            clear(clearMessagesAction());
        }
    }, 4000);

    //submit email to firebase
    const submit = useDispatch();
    const handleSubmit = () => {
        submit(forgotPasswordAction(email));
    };

    //disable button when waiting for response from server
    const isButtonDisabled = loading => loading ? 'forgot-button-disabled' : 'forgot-button';

    /**NB: u can use react-toastify package */
    //set green messages for success and red for error
    const messageClass = (message, str) => message.includes(str) ? 'forgot-alert-success' : 'forgot-alert-failure-msg';

    return (
        <div className='forgot-wrapper'>
            <div className='forgot-form'>
                <h1 className="forgot-header">
                    Forgot Password
                </h1>
                <div className='forgot-label-input-box'>
                    <label className='forgot-label'>EMAIL</label>
                    <br/>
                    <input
                        className='forgot-input'
                        autoComplete='off'
                        type="email" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className={isButtonDisabled(isLoading)}
                    type="submit"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                > SUBMIT</button>
                <Link className='link' to='/auth/signup'>
                    <p className='forgot-sign-up-text-link'>Create new account</p>
                </Link>
                <Link className='link' to='/auth/signin'>
                    <p className='forgot-sign-in-text-link'>Log into your account</p>
                </Link>
            </div>
            {
                message ? 
                    <AuthModal>
                        <p className={messageClass(message, 'check your email')}>{ message }</p>
                    </AuthModal>
                    : ''
            }
        </div>
    )
}

export default Forgot;