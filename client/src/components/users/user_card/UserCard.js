//packages
import React from 'react';
import { Link } from 'react-router-dom';

//local
import './UserCard.css';

const UserCard = ({ user }) => {
    //display no-user-img if the user has no profile pic
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //controlling str length to prevent overflow
    const trimStr = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;

    //controlling case for uniform display
    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return (
        <Link className='user-card-link' to={`/user/${user._id}`}>
            <div className='user-card'>
                <div className='user-card-img-container'>
                    <img className='user-card-img' src={user.profile_pic ? user.profile_pic : PIC} alt='img' />
                </div>
                <div className='user-card-name-city-overlay'>
                    <p className='user-card-name'> { trimStr(user.firstname.toUpperCase(), 9) } </p>
                    <p className='user-card-lastname'> {  trimStr(user.lastname.toUpperCase(), 9) } </p>
                    <p className='user-card-bio'> { trimStr(user.bio, 38) } </p>
                    <p className='user-card-city'> { user.gender ? capitalizeStr(user.gender) : '' } </p>
                </div>
            </div>
        </Link>
    )
}

export default UserCard;
