//local
import {
    FETCH_CONVERSATIONS_ISLOADING,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    FETCH_CHATS_ISLOADING,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE
} from '../types/chats';

const initChatsState = {
    conversations: [],
    chats: [],
    isLoading: true,
    message: '',
    chats_isLoading: true,
    chats_message: ''
}

export const chatsReducer = (state=initChatsState, action={}) => {

    switch(action.type) {
        case FETCH_CONVERSATIONS_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case FETCH_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversations: action.payload.conversations,
                isLoading: action.payload.isLoading
            }
        case FETCH_CONVERSATIONS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        case FETCH_CHATS_ISLOADING:
            return {
                ...state,
                chats_isLoading: action.payload
            }
        case FETCH_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload.chats,
                chats_isLoading: action.payload.isLoading
            }
        case FETCH_CHATS_FAILURE:
            return {
                ...state,
                chats_message: action.payload.message,
                chats_isLoading: action.payload.isLoading
            }
        default:
            return state;
    }
}
    