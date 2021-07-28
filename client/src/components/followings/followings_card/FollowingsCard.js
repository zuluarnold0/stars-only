import React from 'react';
import { Link } from 'react-router-dom';

const FollowingsCard = ({ user }) => {
    
    const PIC = process.env.REACT_APP_NOPIC_IMG;
    return (
        <Link className='link' to={`/user/${user._id}`}>   
            <div className='followings-item'>
                <img
                    className='followings-item-img'
                    src={user.profile_pic ? user.profile_pic : PIC} 
                    alt='img'
                />
            </div>
        </Link>
    )
}

export default FollowingsCard;