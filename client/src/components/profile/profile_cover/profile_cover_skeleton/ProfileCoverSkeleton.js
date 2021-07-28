import React from 'react';

import './ProfileCoverSkeleton.css';

const ProfileCoverSkeleton = () => {
    return (
        <div className='profile-right-upload-cover-box-sk'>
            <div className='profile-right-cover-box-sk'>
                <img
                    className='profile-right-cover-sk'
                    src={'#'}
                    alt='img'
                />
            </div>
        </div>
    )
}

export default ProfileCoverSkeleton;