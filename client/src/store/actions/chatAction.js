import axios from 'axios';

import {
    FETCH_CONVERSATIONS_ISLOADING,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    FETCH_CHATS_ISLOADING,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE
} from '../types/chats';

const port = process.env.REACT_APP_BASE_URL;

export const fetchConversationsAction = ({ token, id }) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_CONVERSATIONS_ISLOADING, payload: true });
            
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.get(`${port}/conversations/${id}`, config);
            
            dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: { conversations: res.data.conversations, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_CONVERSATIONS_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_CONVERSATIONS_FAILURE, payload: { message: 'Failed to fetch conversations', isLoading: false }});
        }
    }
}

export const fetchChatsAction = (token, conversation_id) => {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_CHATS_ISLOADING, payload: true });
            
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            
            const res = await axios.get(`${port}/chats/${conversation_id}`, config);
            
            dispatch({ type: FETCH_CHATS_SUCCESS, payload: { chats: res.data.chats, isLoading: false } });
        }
        catch(e) {
            if (e.response.data.message) {
                return dispatch({ type: FETCH_CHATS_FAILURE, payload: { message: e.response.data.message, isLoading: false } });
            }
            dispatch({ type: FETCH_CHATS_FAILURE, payload: { message: 'Failed to fetch chats', isLoading: false }});
        }
    }
}
