import React from 'react';

import './YourFriendsSkeleton.css'

const YourFriendsSkeleton = () => {
    return (
        <div className='your-friends-skeleton-box'>
        <div className='your-friends-skeleton-wrapper'>
            <div className='your-friends-skeleton'>
                <div className='your-friends-skeleton-item'>
                    <img
                        className='your-friends-skeleton-item-img'
                        src={'#'} 
                        alt='img'
                    />
                </div>
                <div className='your-friends-skeleton-item'>
                    <img
                        className='your-friends-skeleton-item-img'
                        src={''} 
                        alt='img'
                    />
                </div>
                <div className='your-friends-skeleton-item'>
                    <img
                        className='your-friends-skeleton-item-img'
                        src={''} 
                        alt='img'
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default YourFriendsSkeleton;