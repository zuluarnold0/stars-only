//local
import {
    SET_TOKEN,
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

//state for auth messages [success & error], current-user token and loading property used when data is being fetched
const initAuthState = {
    isLoading: false,
    message: '',
    token: ''
}

//reducer for authentication: sign-in, sign-up, forgot
export const authReducer = (state=initAuthState, action={}) => {
    switch(action.type) {
        //sign up
        case SIGNUP_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                token: action.payload.token,
                isLoading: action.payload.isLoading
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        //signin
        case SIGNIN_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                token: action.payload.token
            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        //forgot password
        case FORGOT_PASSWORD_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        //clear state when user logs out
        case CLEAR_STATE:
            return {
                isLoading: false,
                message: '',
                token: ''
            }
        //clear all messages when component loads
        case CLEAR_MESSAGES:
            return {
                ...state,
                isLoading: false,
                message: ''
            }
        //set token from when fetching user profile
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        default:
            return state;
    }
}


