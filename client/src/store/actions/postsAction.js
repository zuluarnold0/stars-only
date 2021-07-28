import axios from 'axios';

import {
    ADD_POST_CONTENT_SUCCESS,
    ADD_POST_CONTENT_FAILURE,
    ADD_POST_CONTENT_ISLOADING,
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_SUCCESS, 
    FETCH_POSTS_ISLOADING,
    FETCH_POST_SUCCESS, 
    FETCH_POST_FAILURE,
    FETCH_POST_ISLOADING,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_ISLOADING,
    CLEAR_POST_MESSAGE,
    ADD_COMMENT_ISLOADING,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    FETCH_CURRENT_USER_POSTS_SUCCESS,
    FETCH_CURRENT_USER_POSTS_FAILURE,
    FETCH_CURRENT_USER_POSTS_ISLOADING,
    FETCH_USER_POSTS_SUCCESS,
    FETCH_USER_POSTS_FAILURE,
    FETCH_USER_POSTS_ISLOADING
} from '../types/posts';

const PORT = process.env.REACT_APP_BASE_URL;

//creating new post on mongodb
export const addPostContentAction = (token, newPost) => async (dispatch) => {
    try {
        dispatch({ type: ADD_POST_CONTENT_ISLOADING, payload: true });

        //send token, post content and image url to server
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
        const body = JSON.stringify(newPost);
        const res = await axios.post(`${PORT}/posts`, body, config);
        
        //get response and set to redux state
        dispatch({ type: ADD_POST_CONTENT_SUCCESS, payload: { posts: res.data.posts, message: 'Your post was uploaded successfully', isLoading: false } });
    }
    catch(e) {
        if (e.response.data.message) {
            return dispatch({ type: ADD_POST_CONTENT_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
        }
        dispatch({ type: ADD_POST_CONTENT_FAILURE, payload: { message: 'Failed to upload post. Please try again later.', isLoading: false } });
    }
}

export const clearPostMessageAction = () => dispatch => dispatch({ type: CLEAR_POST_MESSAGE });

export const fetchPostsAction = token => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_POSTS_ISLOADING, payload: true });

            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.get(`${PORT}/posts`, config);
            dispatch({ type: FETCH_POSTS_SUCCESS, payload: { posts: res.data.posts, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_POSTS_FAILURE, payload: { posts: e.response.data.message, isLoading: false } });
            }

            dispatch({ type: FETCH_POSTS_FAILURE, payload: { message: 'Unable to fetch posts', isLoading: false } });
        }
    }
}

export const fetchPostAction = (postID, token) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_POST_ISLOADING, payload: true });

            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.get(`${PORT}/posts/${postID}`, config);
            dispatch({ type: FETCH_POST_SUCCESS, payload: { post: res.data.post, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                dispatch({ type: FETCH_POST_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_POST_FAILURE, payload: { message: 'Unable to fetch post', isLoading: false }});
        }
    }
}

export const deletePostAction = (post_id, token ) => {
    return async dispatch => {
        try {
            dispatch({ type: DELETE_POST_ISLOADING, payload: true });

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.delete(`${PORT}/posts/${post_id}`, config);
            dispatch({ type: DELETE_POST_SUCCESS, payload: { posts: res.data.posts, message: res.data.message, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: DELETE_POST_FAILURE, payload: e.response.data.message, isLoading: false });
            }
            dispatch({ type: DELETE_POST_FAILURE, payload: 'Unable to delete post', isLoading: false});
        }
    }
}

export const submitCommentAction = (post_id, comment, token) => async (dispatch) => {
    try {
        dispatch({ type: ADD_COMMENT_ISLOADING, payload: true });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ comment });
        const res = await axios.post(`${PORT}/posts/comment/${post_id}`, body, config);
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: { post: res.data.post, isLoading: false } });
    }
    catch(e) {
        if (e.response.data.message) {
            return dispatch({ type: ADD_COMMENT_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
        }
        dispatch({ type: ADD_COMMENT_FAILURE, payload: { message: 'Failed to upload post. Please try again later.', isLoading: false } });
    }
}

export const fetchCurrentserPostsAction = token => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_CURRENT_USER_POSTS_ISLOADING, payload: true });

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.get(`${PORT}/posts/current/userposts`, config);
            dispatch({ type: FETCH_CURRENT_USER_POSTS_SUCCESS, payload: { current_user_posts: res.data.posts, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_CURRENT_USER_POSTS_FAILURE, payload: e.response.data.message, isLoading: false });
            }
            dispatch({ type: FETCH_CURRENT_USER_POSTS_FAILURE, payload: 'Unable to fetch posts', isLoading: false});
        }
    }
}

export const fetchUserPostsAction = (id, token) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_USER_POSTS_ISLOADING, payload: true });

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.get(`${PORT}/posts/userposts/${id}`, config);
            dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: { user_posts: res.data.posts, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_USER_POSTS_FAILURE, payload: e.response.data.message, isLoading: false });
            }
            dispatch({ type: FETCH_USER_POSTS_FAILURE, payload: 'Unable to fetch posts', isLoading: false});
        }
    }
}