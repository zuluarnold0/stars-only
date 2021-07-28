//packages
import React, { useEffect } from 'react';
import { FaAddressCard, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

//local
import './UserProfile.css';
import SideBar from '../../side_bar/SideBar';
import Followings from '../../followings/Followings';
import { fetchUserAction, followUserAction, unFollowUserAction } from '../../../store/actions/usersAction';
import { fetchUserPostsAction } from '../../../store/actions/postsAction';
import UserProfileSkeleton from './user_profile_skeleton/UserProfileSkeleton';

const UserProfile = () => {
    //get id from url
    const id = useParams().id;

    //display this pic if user doesn't have a profile pic
    const PIC = process.env.REACT_APP_NOPIC_IMG;
    
    //only logged in users can access this route
    const token = useSelector((state) => state.auth.token);
    
    //fetch user profile
    const dispatchFetch = useDispatch();
    useEffect(() => {
        token && id && dispatchFetch(fetchUserAction(id, token));
    }, [dispatchFetch, token, id]);
    
    //fetch user's posts from the database 
    /** NB: should have returned count */
    const dispatchPosts = useDispatch();
    useEffect(() => {
       token && id && dispatchPosts(fetchUserPostsAction(id, token));
    }, [dispatchPosts, token, id]);
    
    //follow user action
    const dispatchFollow = useDispatch();
    const handleFollowUser = () => {
        dispatchFollow(followUserAction(id, token));
    }

    //unfollow user action
    const dispatchUnFollow = useDispatch();
    const handleUnFollowUser = () => {
        dispatchUnFollow(unFollowUserAction(id, token));
    }

    //load posts from global state
    const posts_loading = useSelector((state) => state.posts.user_posts_isLoading);
    const posts = useSelector((state) => state.posts.user_posts);

    //load data from global state
    const user = useSelector((state) => state.users.user);
    const loading = useSelector((state) => state.users.user_isLoading);
    const currentUser = useSelector((state) => state.profile.currentUser);

    //trim text to prevent overflow and for good display
    const trimStr = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;
    
    //follow user button
    const displayFollowButton = () => {
        return (
            <div
                onClick={() => handleFollowUser()}
                className='user-profile-follow-link'
            >
                Follow
            </div>
        )
    }
    //unfollow user button
    const displayUnFollowButton = () => {
        return (
            <div
                className='user-profile-follow-link'
                onClick={() => handleUnFollowUser()}
            >
                UnFollow
            </div>
        )
    }

    if (!token) {
        return <Redirect to='/auth/signin' />;
    }
    //loading skeleton to prevent app from breaking while fetching posts and user profile
    if (loading || posts_loading)
        return <UserProfileSkeleton />
    
    //show this component if user is not found
    if (!user && !loading)
        return (
            <div className='user-profile'>
                <div>
                    <SideBar />
                </div>
                <div className='user-profile-not-found'>
                    <h3 className='user-profile-not-found-heading'>OOOOPS....</h3>
                    <p className='user-profile-not-found-text'>NO user was found!</p>
                </div>
            </div>
        )
    
    return (
        <div className='user-profile'>
            <div>
                <SideBar />
            </div>
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    <div className='user-profile-info'>
                        <div className='user-profile-info'>
                            <div className='user-profile-info-img-box'>
                                <img
                                    className='user-profile-info-img'
                                    src={user.profile_pic ? user.profile_pic : PIC} 
                                    alt='img'
                                />
                            </div>
                        </div>
                        <div className='user-profile-name-gender'>
                            <p className='user-profile-name'>{trimStr(user.firstname + ' ' + user.lastname, 15)}</p>
                            <span className='user-profile-gender'>{user.gender}</span>
                        </div>
                        <div className='user-profile-followers-followings-posts'>
                            <div className='user-profile-followers'>
                                <FaUserPlus className='user-profile-icons' />
                                <p className='user-profile-count'>{user.followers.length}</p>
                            </div>
                            <div className='user-profile-followings'>
                                <FaUsers className='user-profile-icons' />
                                <p className='user-profile-count'>{user.followings.length}</p>
                            </div>
                            <div className='user-profile-posts'>
                                <FaAddressCard className='user-profile-icons' />
                                <p className='user-profile-count'>{posts.length}</p>
                            </div>
                        </div>
                        <div className='user-profile-bio'>
                            {trimStr(user.bio, 186)}
                        </div>
                        <div className='user-profile-followings-card'>
                            <Followings
                                id={user._id}
                            />
                        </div>
                        <div className='user-profile-follow-chat'>
                            { 
                                currentUser && user.followers.includes(currentUser._id) ?
                                    displayUnFollowButton() : displayFollowButton()
                            }
                            <button disabled className='user-profile-chat-link'>
                                Chat
                            </button>
                        </div>
                    </div>
                    <div className='user-profile-right-img-box'>
                        <img
                            className='user-profile-right-img'
                            src={user.profile_pic ? user.profile_pic : PIC} 
                            alt='img'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;