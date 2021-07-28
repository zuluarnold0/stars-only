import {
    MYPROFILE_ISLOADING,
    FETCH_MY_PROFILE_SUCCESS,
    FETCH_MY_PROFILE_FAILURE,
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
/** 
 * could have used 1 loading and one message property but 
 * intentionally repeated to prevent collisions
*/
const initProfileState = {
    currentUser: null,
    isLoading: true,
    message: '',
    profile_img_isLoading: false,
    profile_img_message: '',
    cover_img_isLoading: false,
    cover_img_message: '',
    update_info_isLoading: false,
    update_info_message: '',
    email_isLoading: false,
    email_message: '',
    update_password_isLoading: false,
    update_password_message: '',
}
/**
 * refactoring could have been done on repeated 'case' syntax
 * e.g: case MYPROFILE_ISLOADING:
 *      case UPLOAD_ISLOADING:
 *      case UPDATE_EMAIL_ISLOADING:
 *          return { ... }
 *  but i left for readability
 */
export const profileReducer = (state=initProfileState, action={}) => {

    switch(action.type) {
        case MYPROFILE_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case FETCH_MY_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                isLoading: action.payload.isLoading
            }
        case FETCH_MY_PROFILE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        case UPDATE_INFO_ISLOADING:
            return {
                ...state,
                update_info_isLoading: action.payload
            }
        case UPDATE_INFO_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                update_info_message: action.payload.message,
                update_info_isLoading: action.payload.isLoading
            }
        case UPDATE_INFO_FAILURE:
            return {
                ...state,
                update_info_message: action.payload.message,
                update_info_isLoading: action.payload.isLoading
            }
        case UPDATE_EMAIL_ISLOADING:
            return {
                ...state,
                email_isLoading: action.payload
            }
        case UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                email_message: action.payload.message,
                email_isLoading: action.payload.update_email_isLoading
            }
        case UPDATE_EMAIL_FAILURE:
            return {
                ...state,
                email_message: action.payload.message,
                email_isLoading: action.payload.update_email_isLoading
            }
        case UPDATE_PASSWORD_ISLOADING:
            return {
                ...state,
                update_password_isLoading: action.payload
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                update_password_message: action.payload.message,
                update_password_isLoading: action.payload.isLoading
            }
        case UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                update_password_message: action.payload.message,
                update_password_isLoading: action.payload.isLoading
            }
        case CLEAR_PROFILE_MSGS:
            return {
                ...state,
                message: '',
                profile_img_message: '',
                cover_img_message: '',
                update_info_message: '',
                email_message: '',
                update_password_message: ''
            }
        case UPLOAD_PROFILE_IMAGE_ISLOADING:
            return {
                ...state,
                profile_img_isLoading: action.payload
            }
        case UPLOAD_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                profile_img_isLoading: action.payload.isLoading,
                profile_img_message: action.payload.message
            }
        case UPLOAD_PROFILE_IMAGE_FAILURE:
            return {
                ...state,
                profile_img_message: action.payload.message,
                profile_img_isLoading: action.payload.isLoading
            }
        case UPLOAD_COVER_IMAGE_ISLOADING:
            return {
                ...state,
                cover_img_isLoading: action.payload
            }
        case UPLOAD_COVER_IMAGE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                cover_img_isLoading: action.payload.isLoading,
                cover_img_message: action.payload.message
            }
        case UPLOAD_COVER_IMAGE_FAILURE:
            return {
                ...state,
                cover_img_message: action.payload.message,
                cover_img_isLoading: action.payload.isLoading
            }
        default:
            return state;
    }
}
