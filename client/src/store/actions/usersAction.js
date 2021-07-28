import axios from 'axios';

import {
    FETCH_USERS_ISLOADING,
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USER_ISLOADING,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_FOLLOWINGS_ISLOADING,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAILURE,
    FOLLOW_USER_ISLOADING,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_ISLOADING,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE
} from '../types/users';

const port = process.env.REACT_APP_BASE_URL;

export const fetchUsersAction = token => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_USERS_ISLOADING, payload: true });
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.get(`${port}/users`, config);
            
            dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: res.data.users, isLoading: false} });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_USERS_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_USERS_FAILURE, payload: { message: 'Could not Fetch users', isLoading: false } });
        }
    }
}

export const fetchUserAction = (id, token) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_USER_ISLOADING, payload: true });
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.get(`${port}/users/${id}`, config);
            
            dispatch({ type: FETCH_USER_SUCCESS, payload: { user: res.data.user, isLoading: false} });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_USER_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_USER_FAILURE, payload: { message: 'Could not fetch user', isLoading: false } });
        }
    }
}

export const fetchFollowingsAction = (id, token) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_FOLLOWINGS_ISLOADING, payload: true });

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.get(`${port}/users/${id}/followings`, config);
            
            dispatch({ type: FETCH_FOLLOWINGS_SUCCESS, payload: { followings: res.data.followings, message: res.data.message } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_FOLLOWINGS_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_FOLLOWINGS_FAILURE, payload: { message: 'Could not Fetch users', isLoading: false } });
        }
    }
}

export const fetchSearchedUsersAction = (searchTerm) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_USERS_ISLOADING, payload: true });
          
            const res = await axios.get(`${port}/users/search/${searchTerm}`);
            dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: res.data.users, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_USERS_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_USERS_FAILURE, payload: { message: e.message, isLoading: false } });
        }
    }
}

export const followUserAction = (id, token) => {
    return async dispatch => {
        try {
            dispatch({ type: FOLLOW_USER_ISLOADING, payload: true });

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.post(`${port}/user/${id}/follow`, config);
            
            dispatch({ type: FOLLOW_USER_SUCCESS, payload: { user: res.data.user, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FOLLOW_USER_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FOLLOW_USER_FAILURE, payload: { message: 'Failed to process your request. Try again later', isLoading: false } });
        }
    }
}

export const unFollowUserAction = (id, token) => {
    return async dispatch => {
        try {
            dispatch({ type: UNFOLLOW_USER_ISLOADING, payload: true });

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.post(`${port}/user/${id}/unfollow`, config);
            
            dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: { user: res.data.user, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: UNFOLLOW_USER_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: UNFOLLOW_USER_FAILURE, payload: { message: 'Failed to process your request. Try again later', isLoading: false } });
        }
    }
}