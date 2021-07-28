//packages
import React from 'react';

//local
import './FriendsProfile.css';

const FriendsProfile = ({ user }) => {

    //show this pic from assets folder if user has no profile pic
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //trim string to prevent overflow
    const trimStr = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;
    
    //Convert first character of a string to uppercase and there rest to lowercase
    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div>
            <div className='friends-profile-pic-box'>
                <img 
                    className='friends-profile-pic'
                    src={user.profile_pic ? user.profile_pic : PIC}
                    alt='img'
                />
            </div>
            <div className='friends-profile-name-gender'>
                <p className='friends-profile-name'>
                    { trimStr(capitalizeStr(user.firstname), 12)}
                </p>
            </div>
            <div className='friends-profile-followers-followings-posts'>
                <div className='friends-profile-followers'>
                    <p className='friends-profile-count'>{user.followers.length}</p>
                    <span className='friends-profile-text'>Followers</span>
                </div>
                <div className='friends-profile-followings'>
                    <p className='friends-profile-count'>{user.followings.length}</p>
                    <span className='friends-profile-text'>Followings</span>
                </div>
            </div>
            <div className='friends-profile-user-info'>
                <p className='friends-profile-user-info-heading'>User Info</p>
                <p className='friends-profile-user-info-detail'>{capitalizeStr(user.firstname) + ' ' + capitalizeStr(user.lastname)}</p>
                <p className='friends-profile-user-info-detail'>{user.gender ? capitalizeStr(user.gender) : ''}</p>
                <p className='friends-profile-user-info-detail'>{user.location}</p>
                <p className='friends-profile-user-info-detail-bio'>{trimStr(user.bio, 184)}</p>
            </div>
        </div>
    )
}

export default FriendsProfile;