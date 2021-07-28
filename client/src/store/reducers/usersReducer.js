import {
    FETCH_USERS_ISLOADING,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
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

const initUsersState = {
    users: [],
    users_isLoading: true,
    users_message: '',
    user: null,
    user_isLoading: true,
    user_message: '',
    followings: [],
    followings_isLoading: true,
    followings_message: ''
}

export const usersReducer = (state=initUsersState, action={}) => {

    switch(action.type) {
        
        case FETCH_USERS_ISLOADING:
            return {
                ...state,
                users_isLoading: action.payload
            }
        case FETCH_USERS_SUCCESS:
                return {
                    ...state,
                    users: action.payload.users,
                    users_isLoading: action.payload.isLoading
                }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                users_message: action.payload.message,
                users_isLoading: action.payload.isLoading
        }
        case FETCH_USER_ISLOADING:
            return {
                ...state,
                user_isLoading: action.payload
            }
        case FETCH_USER_SUCCESS:
                return {
                    ...state,
                    user: action.payload.user,
                    user_isLoading: action.payload.isLoading
                }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                user_message: action.payload.message,
                user_isLoading: action.payload.isLoading
        }
        case FETCH_FOLLOWINGS_ISLOADING:
                return {
                    ...state,
                    followings_isLoading: action.payload
                }
        case FETCH_FOLLOWINGS_SUCCESS:
            return {
                ...state,
                followings: action.payload.followings,
                followings_isLoading: action.payload.isLoading
            }
        case FETCH_FOLLOWINGS_FAILURE:
            return {
                ...state,
                followings_message: action.payload.message,
                followings_isLoading: action.payload.isLoading
            }
        case FOLLOW_USER_ISLOADING:
            return {
                ...state,
                user_isLoading: action.payload
            }
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                user_isLoading: action.payload.isLoading
            }
        case FOLLOW_USER_FAILURE:
            return {
                ...state,
                user_message: action.payload.message,
                user_isLoading: action.payload.isLoading
        }
        case UNFOLLOW_USER_ISLOADING:
            return {
                ...state,
                user_isLoading: action.payload
            }
        case UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                user_isLoading: action.payload.isLoading
            }
        case UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                user_message: action.payload.message,
                user_isLoading: action.payload.isLoading
        }
        default:
            return state;
    }
}
