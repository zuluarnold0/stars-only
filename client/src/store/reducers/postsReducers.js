import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_SUCCESS, 
    FETCH_POSTS_ISLOADING, 
    FETCH_POST_SUCCESS, 
    FETCH_POST_FAILURE,
    FETCH_POST_ISLOADING,
    DELETE_POST_SUCCESS, 
    DELETE_POST_FAILURE,
    DELETE_POST_ISLOADING,
    ADD_POST_CONTENT_SUCCESS,
    ADD_POST_CONTENT_FAILURE,
    ADD_POST_CONTENT_ISLOADING,
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

const initPostsState = {
    posts: [],
    posts_message: '',
    posts_isLoading: true,
    post: null,
    post_message: '',
    post_isLoading: true,
    delete_post_message: '',
    delete_post_isloading: false,
    posts_content_message: '',
    posts_content_isLoading: false,
    comment_message: '',
    comment_isLoading: false,
    current_user_posts: [],
    current_user_posts_message: '',
    current_user_posts_isLoading: false,
    user_posts: [],
    user_posts_message: '',
    user_posts_isLoading: false
}

export const postsReducer = (state=initPostsState, action={}) => {
    switch(action.type) {
        case FETCH_POSTS_ISLOADING:
            return {
                ...state,
                posts_isLoading: action.payload
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                posts_isLoading: action.payload.isLoading
            }
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                posts_message: action.payload.message,
                posts_isLoading: action.payload.isLoading
            }
        case FETCH_POST_ISLOADING:
            return {
                ...state,
                post_isLoading: action.payload
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                post: action.payload.post,
                post_isLoading: action.payload.isLoading
            }
        case FETCH_POST_FAILURE:
            return {
                ...state,
                posts_message: action.payload.message,
                post_isLoading: action.payload.isLoading
            }
        case DELETE_POST_ISLOADING:
            return {
                ...state,
                delete_post_isloading: action.payload
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                delete_post_message: action.payload.message,
                delete_post_isloading: action.payload.isLoading
            }
        case DELETE_POST_FAILURE:
            return {
                ...state,
                delete_post_message: action.payload.message,
                delete_post_isloading: action.payload.isLoading
            }
        case ADD_POST_CONTENT_ISLOADING:
            return {
                ...state,
                posts_content_isLoading: action.payload
            }
        case ADD_POST_CONTENT_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                posts_content_message: action.payload.message,
                posts_content_isLoading: action.payload.isLoading
            }
        case ADD_POST_CONTENT_FAILURE:
            return {
                ...state,
                posts_content_message: action.payload.message,
                posts_content_isLoading: action.payload.isLoading
            }
        case CLEAR_POST_MESSAGE:
            return {
                ...state,
                posts_content_message: '',
                delete_post_message: ''
            }
        case ADD_COMMENT_ISLOADING:
            return {
                ...state,
                comment_isLoading: action.payload
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                comment_isLoading: action.payload.isLoading
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                comment_message: action.payload.message,
                comment_isLoading: action.payload.isLoading
            }
        case FETCH_CURRENT_USER_POSTS_ISLOADING:
            return {
                ...state,
                current_user_posts_isLoading: action.payload
            }
        case FETCH_CURRENT_USER_POSTS_SUCCESS:
            return {
                ...state,
                current_user_posts: action.payload.current_user_posts,
                current_user_posts_isLoading: action.payload.isLoading
            }
        case FETCH_CURRENT_USER_POSTS_FAILURE:
            return {
                ...state,
                current_user_posts_message: action.payload.message,
                current_user_posts_isLoading: action.payload.isLoading
            }
        case FETCH_USER_POSTS_ISLOADING:
                return {
                    ...state,
                    user_posts_isLoading: action.payload
                }
        case FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                user_posts: action.payload.user_posts,
                user_posts_isLoading: action.payload.isLoading
            }
        case FETCH_USER_POSTS_FAILURE:
            return {
                ...state,
                user_posts_message: action.payload.message,
                user_posts_isLoading: action.payload.isLoading
            }
        default:
            return state;
    }
}
