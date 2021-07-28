//packages
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//local
import AuthModal from '../auth_modal/AuthModal';
import { signInUserAction, clearMessagesAction } from '../../../store/actions/authAction';
import './SignIn.css';

const SignIn = () => {
    //auth img stored on assets folder
    const PIC = process.env.REACT_APP_AUTH_IMG;

    //initialize state of the input fields
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    //submit signin inputs to action function
    const submitSignin = useDispatch();
    const handleSubmit = () => {
        submitSignin(signInUserAction({ email, password}))
    }

    //data from redux state
    const message = useSelector((state) => state.auth.message);
    const isLoading = useSelector((state) => state.auth.isLoading);

    //clear message after 4 sec
    const clear = useDispatch();
    setTimeout(() => {
        message.length > 0 && clear(clearMessagesAction());
    }, 4000);

    //if request is loading disable the button
    const isButtonDisabled = loading => loading ? 'sign-in-button-disabled' : 'sign-in-button';

    //take user to dashboard if logged in
    const token = useSelector((state) => state.auth.token);
    if (token)
        return <Redirect to="/dashboard"/>
    
    return (
            <div className='sign-in-wrapper'>
                <div className='sign-in-left'>
                    <div className='sign-in-form'>
                        <div className='main-logo'>
                            <span className="main-logo-left">starz</span>
                            <span className="main-logo-right">only</span>
                        </div>
                        <h1 className="sign-in-header ">
                            SIGN IN
                        </h1>
                        <div className='sign-in-label-input-box'>
                            <label className='sign-in-label'>E-MAIL</label>
                            <br/>
                            <input
                                className='sign-in-input'
                                autoComplete='off'
                                type="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='sign-in-label-input-box'>
                            <label className='sign-in-label'>PASSWORD</label>
                            <br />
                            <input
                                className='sign-in-input'
                                autoComplete='off'
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className={isButtonDisabled(isLoading)}
                            type="submit"
                            onClick={() => handleSubmit()}
                            disabled={isLoading}
                        > SIGN IN </button>

                        <Link className='link' to='/auth/signup'>
                            <p className='sign-in-sign-up-text-link'>Create new account</p>
                        </Link>
                        <Link className='link' to='/auth/forgot'>
                            <p className='sign-in-forgot-text-link'>Forgot Password?</p>
                        </Link>
                    </div>
                </div>
                <div className='sign-in-right'>
                    <img className='sign-in-right-img' src={PIC} alt='img' />
                </div>
                {
                    message ? 
                        <AuthModal>
                            <p className='sign-in-alert-failure-msg'>{ message }</p>
                        </AuthModal>
                        : ''
                }
            </div>
    )
}

export default SignIn;