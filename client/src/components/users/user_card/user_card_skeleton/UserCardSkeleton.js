import React from 'react';

import './UserCardSkeleton.css';

const UserCardSkeleton = () => {
    
    const COUNTER = 6;
    const UserSkeleton = () => (
        <div className='user-card-skeleton'></div>
    )
    return Array(COUNTER).fill().map((item, index) => (<UserSkeleton  key={index} />));
}

export default UserCardSkeleton;