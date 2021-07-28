import React from 'react';

import './ProfileInfoSkeleton.css';

const ProfileInfoSkeleton = () => {
    return (
        <div className='profile-info-skeleton-pic-box'>
            <div className='profile-left-skeleton-pic-box'>
                <img 
                    className='profile-left-skeleton-pic'
                    src={'#'}
                    alt='img'
                />
            </div>
            <div className='profile-left-skeleton-name-gender'>
                <p className='profile-left-skeleton-name'></p>
            </div>

            <div className='profile-left-skeleton-upload-pic'></div>

            <div className='profile-left-skeleton-followers-followings-posts'>
                <div className='profile-left-skeleton-followers'>
                    <span className='profile-left-skeleton-text'></span>
                </div>
                <div className='profile-left-skeleton-followings'>
                    <span className='profile-left-skeleton-text'></span>
                </div>
                <div className='profile-left-skeleton-posts'>
                    <span className='profile-left-skeleton-text'></span>
                </div>
            </div>
            <div className='profile-left-skeleton-user-info'>
                <p className='profile-left-skeleton-user-info-heading'></p>
                <p className='profile-left-skeleton-user-info-detail'></p>
                <p className='profile-left-skeleton-user-info-detail'></p>
                <p className='profile-left-skeleton-user-info-detail'></p>
                <p className='profile-left-skeleton-user-info-detail-bio'></p>
            </div>
        </div>
    )
}

export default ProfileInfoSkeleton;