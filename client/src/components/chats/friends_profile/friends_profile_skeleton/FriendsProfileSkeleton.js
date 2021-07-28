import React from 'react';

import './FriendsProfileSkeleton.css';

const FriendsProfileSkeleton = () => {
    return (
        <div className='friends-profile-skeleton'>
            <div className='friends-profile-skeleton-pic-box'>
                <img 
                    className='friends-profile-skeleton-pic'
                    src={'#'}
                    alt='img'
                />
            </div>
            <div className='friends-profile-skeleton-name-gender'>
                <p className='friends-profile-skeleton-name'></p>
            </div>

            <div className='friends-profile-skeleton-followers-followings-posts'>
                <div className='friends-profile-skeleton-followers'>
                    <span className='friends-profile-skeleton-text'></span>
                </div>
                <div className='friends-profile-skeleton-followings'>
                    <span className='friends-profile-skeleton-text'></span>
                </div>
            </div>
            <div className='friends-profile-skeleton-user-info'>
                <p className='friends-profile-skeleton-user-info-heading'></p>
                <p className='friends-profile-skeleton-user-info-detail'></p>
                <p className='friends-profile-skeleton-user-info-detail'></p>
                <p className='friends-profile-skeleton-user-info-detail'></p>
                <p className='friends-profile-skeleton-user-info-detail-bio'></p>
            </div>
        </div>
    )
}

export default FriendsProfileSkeleton;