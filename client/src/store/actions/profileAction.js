import axios from 'axios';

import { SET_TOKEN } from '../types/auth';

import {
    MYPROFILE_ISLOADING,
    FETCH_MY_PROFILE_FAILURE,
    FETCH_MY_PROFILE_SUCCESS,
    UPDATE_INFO_ISLOADING,
    UPDATE_INFO_SUCCESS,
    UPDATE_INFO_FAILURE,
    UPDATE_EMAIL_ISLOADING,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_EMAIL_FAILURE,
    UPDATE_PASSWORD_ISLOADING,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    CLEAR_PROFILE_MSGS,
    UPLOAD_PROFILE_IMAGE_ISLOADING,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    UPLOAD_PROFILE_IMAGE_FAILURE,
    UPLOAD_COVER_IMAGE_ISLOADING,
    UPLOAD_COVER_IMAGE_SUCCESS,
    UPLOAD_COVER_IMAGE_FAILURE
} from '../types/profile';

const port = process.env.REACT_APP_BASE_URL;

//fetch current user profile using firebase token
export const fetchMyProfileAction = token => {
    return async dispatch => {
        try {
            dispatch({ type: MYPROFILE_ISLOADING, payload: true });
            
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            //a get request to the server
            const res = await axios.get(`${port}/profile/me`, config);
            
            //set token to user reducer
            dispatch({ type: SET_TOKEN, payload: { token } });
            dispatch({ type: FETCH_MY_PROFILE_SUCCESS, payload: { user: res.data.user, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_MY_PROFILE_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_MY_PROFILE_FAILURE, payload: { message: 'Failed to process your request. Try again later', isLoading: false } });
        }
    }
}

export const updateUserInfoAction = ({ token, firstname, lastname, bio, gender, location }) => {
    return async dispatch => {
        try {

            dispatch({ type: UPDATE_INFO_ISLOADING, payload: true });

            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            
            const body = JSON.stringify({ firstname, lastname, bio, gender, location });

            const res = await axios.put(`${port}/user/profile`, body, config);
            dispatch({ type: UPDATE_INFO_SUCCESS, payload: { currentUser: res.data.currentUser, message: 'Profile updated successfully', isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: UPDATE_INFO_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: UPDATE_INFO_FAILURE, payload: { message: 'Failed to process your request. Try again later', isLoading: false } });
        }
    }
}

export const updateUserEmailAction = ({ token, email, password }) => {
    return async dispatch => {
        try {
            dispatch({ type: UPDATE_EMAIL_ISLOADING, payload: true });
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ email, password });
            const res = await axios.put(`${port}/user/profile/email`, body, config);
            dispatch({ type: UPDATE_EMAIL_SUCCESS, payload: { message: res.data.message, update_email_isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: UPDATE_EMAIL_FAILURE, payload: { message: e.response.data.message, update_email_isLoading: false } });
            }
            dispatch({ type: UPDATE_EMAIL_FAILURE, payload: { message: 'Failed to update email. Please try again later.', update_email_isLoading: false } });
        }
    }
}

//send profile image url to mongodb
export const uploadProfileImageAction = (token, url) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_PROFILE_IMAGE_ISLOADING, payload: true });

        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`${port}/profile/upload-profile-image`, url, config);
        dispatch({ type: UPLOAD_PROFILE_IMAGE_SUCCESS, payload: { currentUser: res.data.currentUser, message: 'image uploaded successfully', isLoading: false } });
    }
    catch(e) {
        if (e.response.data.message) {
            return dispatch({ type: UPLOAD_PROFILE_IMAGE_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
        }
        dispatch({ type: UPLOAD_PROFILE_IMAGE_FAILURE, payload: { message: 'Sorry your post image could not be uploaded. Please try again later.', isLoading: false } });
    }
}

//send cover image url to mongodb
export const coverImageAction = (token, url) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_COVER_IMAGE_ISLOADING, payload: true });

        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`${port}/profile/upload-cover-image`, url, config);
        dispatch({ type: UPLOAD_COVER_IMAGE_SUCCESS, payload: { currentUser: res.data.currentUser, message: 'Your cover image was uploaded successfully', isLoading: false } });
    }
    catch(e) {
        if (e.response.data.message) {
            return dispatch({ type: UPLOAD_COVER_IMAGE_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
        }
        dispatch({ type: UPLOAD_COVER_IMAGE_FAILURE, payload: { message: 'Sorry your post image could not be uploaded. Please try again later.', isLoading: false } });
    }
}

export const updatePasswordAction = ({ token, oldPassword, newPassword }) => {
    return async dispatch => {
        try {
            dispatch({ type: UPDATE_PASSWORD_ISLOADING, payload: true });

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ oldPassword, newPassword });
            const res = await axios.put(`${port}/user/profile/password`, body, config);
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: { message: res.data.message, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: { message: 'Failed to update password. Please try again later.', isLoading: false } });
        }
    }
}

export const clearProfileMsgsAction = () => dispatch => dispatch({ type: CLEAR_PROFILE_MSGS });
