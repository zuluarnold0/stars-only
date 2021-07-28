//packages
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

//local
import AuthModal from '../auth_modal/AuthModal';
import { clearMessagesAction, signUpUserAction } from '../../../store/actions/authAction';
import './SignUp.css';

const SignUp = () => {
    //auth img stored on assets folder
    const PIC = process.env.REACT_APP_AUTH_IMG;

    //initialize state of input fields
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cpassword, setCPassword ] = useState('');

    //get data from redux state
    const token = useSelector((state) => state.auth.token);
    const message = useSelector((state) => state.auth.message);
    const isLoading = useSelector((state) => state.auth.isLoading)

    //submit signup inputs to firebase auth then add user to mongodb
    const dispatchSignUp = useDispatch();
    const handleSubmit = () => {
        dispatchSignUp(signUpUserAction({firstname, lastname, email, password, cpassword}));
    }

    /**NB: u can use toastify package */
    //error messages in red, success messages in green
    const messageClass = (message, str) => message.includes(str) ? 'sign-up-alert-success' : 'sign-up-alert-failure-msg';

    //disable button when loading
    const isButtonDisabled = loading => loading ? 'sign-up-button-disabled' : 'sign-up-button';

    //clear error messages from global state after 4 sec
    const dispatchClear = useDispatch();
    setTimeout(() => {
        if (message.length > 0) {
            dispatchClear(clearMessagesAction());
        }
    }, 4000);

    //if user is logged in route to dashboard
    if (token)
        return <Redirect to="/dashboard"/>
    
    return (
        <div className='sign-up-wrapper sign-up-wrapper-white'>
            <div className='sign-up-left'>
                <div className='sign-up-form'>
                    <h1 className="sign-up-header ">
                        Sign Up
                    </h1>
                    <div className='sign-up-label-input-box'>
                        <label className='sign-up-label'>FIRSTNAME</label>
                        <br/>
                        <input
                            className='sign-up-input'
                            autoComplete='off'
                            type="text" 
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className='sign-up-label-input-box'>
                        <label className='sign-up-label'>LASTNAME</label>
                        <br/>
                        <input
                            className='sign-up-input'
                            autoComplete='off'
                            type="text" 
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className='sign-up-label-input-box'>
                        <label className='sign-up-label'>EMAIL</label>
                        <br/>
                        <input
                            className='sign-up-input'
                            autoComplete='off'
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='sign-up-label-input-box'>
                        <label className='sign-up-label'>PASSWORD</label>
                        <br />
                        <input
                            className='sign-up-input'
                            autoComplete='off'
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='sign-up-label-input-box'>
                        <label className='sign-up-label'>CONFIRM PASSWORD</label>
                        <br />
                        <input
                            className='sign-up-input'
                            autoComplete='off'
                            type="password"
                            name="cpassword" 
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={isButtonDisabled(isLoading)}
                        type="submit"
                        onClick={() => handleSubmit()}
                        disabled={isLoading}
                    > SIGN UP </button>
                    <Link className='link' to='/auth/signin'>
                        <p className='sign-up-forgot-text-link'>Log into your account</p>
                    </Link>
                </div>
            </div>
            <div className='sign-up-right'>
                <img className='sign-up-right-img' src={PIC} alt='img' />
            </div>
            {
                message ? 
                    <AuthModal>
                        <p className={messageClass(message, 'was successful')}>{ message }</p>
                    </AuthModal>
                    : ''
            }
        </div>
    )
}

export default SignUp;