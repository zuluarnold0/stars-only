import React from 'react';

import './FollowingsSkeleton.css'

const FollowingsSkeleton = () => {
    return (
        <div className='followings-skeleton-box'>
        <div className='followings-skeleton-wrapper'>
            <div className='followings-skeleton'>
                <div className='followings-skeleton-item'>
                    <img
                        className='followings-skeleton-item-img'
                        src={''} 
                        alt='img'
                    />
                </div>
                <div className='followings-skeleton-item'>
                    <img
                        className='followings-skeleton-item-img'
                        src={''} 
                        alt='img'
                    />
                </div>
                <div className='followings-skeleton-item'>
                    <img
                        className='followings-skeleton-item-img'
                        src={''} 
                        alt='img'
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default FollowingsSkeleton;