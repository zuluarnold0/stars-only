//packages
import { combineReducers } from 'redux';

//local
import { authReducer } from './reducers/authReducer';
import { postsReducer } from './reducers/postsReducers';
import { profileReducer } from './reducers/profileReducer';
import { usersReducer } from './reducers/usersReducer';
import { chatsReducer } from './reducers/chatsReducer';

//combine all app reducers to one reducer
const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    profile: profileReducer,
    chats: chatsReducer
})

export default rootReducer;
