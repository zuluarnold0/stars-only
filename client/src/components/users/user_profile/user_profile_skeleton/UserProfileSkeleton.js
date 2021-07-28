import React from 'react';

import './UserProfileSkeleton.css';
import SideBar from '../../../side_bar/SideBar';

const UserProfileSkeleton = () => {

    return (
        <div className='user-profile'>
            <div>
                <SideBar />
            </div>
            <div className='user-profile-sk-container'>
                <div className='user-profile-sk-card'>
                    <div className='user-profile-sk-info'>
                        <div className='user-profile-sk-info'>
                            <div className='user-profile-sk-info-img-box'>
                                <img
                                    className='user-profile-sk-info-img'
                                    src={'#'} 
                                    alt='img'
                                />
                            </div>
                        </div>
                        <div className='user-profile-sk-name-gender'>
                            <p className='user-profile-sk-name'></p>
                            <p className='user-profile-sk-gender'></p>
                        </div>
                        <div className='user-profile-sk-followers-followings-posts'>
                            <div className='user-profile-sk-followers'>
                                <p className='user-profile-sk-count'></p>
                            </div>
                            <div className='user-profile-sk-followings'>
                                <p className='user-profile-sk-count'></p>
                            </div>
                            <div className='user-profile-sk-posts'>
                                <p className='user-profile-sk-count'></p>
                            </div>
                        </div>
                        <p className='user-profile-sk-bio'></p>
                        <div className='user-profile-sk-followings-card'></div>
                        <div className='user-profile-sk-follow-chat'>
                            <div className='user-profile-sk-follow-link'></div>
                            <div className='user-profile-sk-chat-link'></div>
                        </div>
                    </div>
                    <div className='user-profile-sk-right-img-box'>
                        <img
                            className='user-profile-sk-right-img'
                            src={'#'} 
                            alt='img'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSkeleton;