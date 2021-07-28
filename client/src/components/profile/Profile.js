//packages
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//local
import './Profile.css';
import SideBar from '../side_bar/SideBar';
import Followings from '../followings/Followings';
import ProfileInfo from './profile_info/ProfileInfo';
import ProfileCover from './profile_cover/ProfileCover';
import CurrentUserPosts from './current_user_posts/CurrentUserPosts';
import FollowingsSkeleton from '../followings/followings_skeleton/FollowingsSkeleton';

const Profile = () => {

    /*grab data from global state */
    const token = useSelector((state) => state.auth.token); //token to allow user to use app
    const currentUser = useSelector((state) => state.profile.currentUser); //info of currently logged in user
    
    //only authenticated users can see this route
    if (!token)
        return <Redirect to='/auth/signin' />;
    
    return (
        <div className='profile'>
            <div>
                <SideBar />
            </div>
            <div className='profile-container'>
                <div className='profile-wrapper'>
                    <div className='profile-left-box'>
                        <ProfileInfo />
                    </div>
                    <div className='profile-right-box'>
                        <div className='profile-right-profile-cover'>
                            <ProfileCover />
                        </div>
                        <div className='profile-right-followings-posts'>
                            <div className='profile-right-posts'>
                                <p className='profile-right-posts-heading'>Posts</p>
                                <div className='profile-right-posts-list'>
                                    <CurrentUserPosts />
                                </div>
                            </div>
                            <div className='profile-right-followings'>
                                <p className='profile-right-posts-heading'>Followings</p>
                                {
                                    currentUser ?
                                        <div className='profile-right-followings-card'>
                                            <Followings id={currentUser._id} />
                                        </div> 
                                        :
                                        <FollowingsSkeleton />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;