//packages
import axios from 'axios';

//local
import { firebaseAuth } from '../../config/firebase';
import { validateSignUpInputs } from './auth_action_helpers/AuthActionHelpers';
import {
    SIGNUP_ISLOADING,
    SIGNUP_SUCCESS, 
    SIGNUP_FAILURE,
    SIGNIN_ISLOADING, 
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    CLEAR_STATE,
    CLEAR_MESSAGES,
    FORGOT_PASSWORD_ISLOADING,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from '../types/auth';

const port = process.env.REACT_APP_BASE_URL;

//sign up
export const signUpUserAction = formInputs => {
    return async dispatch => {
        try {
            dispatch({ type: SIGNUP_ISLOADING, payload: true });

            const validationResults = validateSignUpInputs(formInputs);
            if (validationResults.message !== "")
                return dispatch({ type: SIGNUP_FAILURE, payload: { message: validationResults.message, isLoading: false } });

            const { firstname, lastname, email, password } = formInputs;

            //create user on firebase with email and password authentication
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
            const token = await firebaseAuth.currentUser.getIdTokenResult().token;
            
            if (!token)
                return dispatch({ type: SIGNUP_FAILURE, payload: { message: "Sorry your request could not be proccessed. Please try again later", isLoading: false } });
            
            //create user on mongodb
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ firstname, lastname });

            //send firstname, lastname & token to server
            //if response, set it to redux state
            const res = await axios.post(`${port}/auth/signup`, body, config);
            dispatch({ type: SIGNUP_SUCCESS, payload: { message: res.data.message, token, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: SIGNUP_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: SIGNUP_FAILURE, payload: { message: e.message, isLoading: false } });
        }
    }
}

//sign in to firebase
export const signInUserAction = ({ email, password }) => {
    return async dispatch => {
        try {
            dispatch({ type: SIGNIN_ISLOADING, payload: true });

            //validate inputs
            if (!email || !password) {
                return dispatch({ type: SIGNIN_FAILURE, payload: { message: "All fields are required", isLoading: false } });
            }

            //sign in user, get firebase-token and set to redux state
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            
            const token = await firebaseAuth.currentUser.getIdTokenResult().token;
            
            if (!token)
                return dispatch({ type: SIGNIN_FAILURE, payload: { message: "Sorry your request could not be proccessed. Please try again later", isLoading: false } });

            dispatch({ type: SIGNIN_SUCCESS, payload: { token, isLoading: false } });
        }
        catch(e) {
            dispatch({ type: SIGNIN_FAILURE, payload: { message: e.message, isLoading: false } });
        }
    }
}

//logout of firebase
export const logOut = () => {
    return async dispatch => {
        try {
            await firebaseAuth.signOut();
            dispatch({ type: CLEAR_STATE });
        }
        catch(e) {
            //console.log(e)
        }
    }
}

export const clearMessagesAction = () => dispatch => dispatch({ type: CLEAR_MESSAGES });

//forgot password action: firebase 'reset password method called to send a reset message
export const forgotPasswordAction = email => {
    return async dispatch => {
        try {
            dispatch({ type: FORGOT_PASSWORD_ISLOADING, payload: true });

            if (!email)
                return dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: { message: 'Email field cannot be empty', isLoading: false } });

            await firebaseAuth.sendPasswordResetEmail(email);

            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: { message: 'Please check your email', isLoading: false } });
        }
        catch(e) {
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: { message: e.message, isLoading: false } });
        }
    }
}
 