//packages
import React from 'react';

//local
import './ListUsers.css';
import UserCard from '../user_card/UserCard';
import UserCardSkeleton from '../user_card/user_card_skeleton/UserCardSkeleton';

const ListUsers = ({ users, loading }) => {

    //loading skeleton to prevent app from breaking while fetch data
    if (loading)
        return (
            <div className='user-card-skeleton-box'>
                <UserCardSkeleton />
            </div>
        )
    
    //loading skeleton to prevent app from breaking if they are no users
    if (!users.length && !loading)
        return (
            <div className='no-users'>
                <h3 className="heading"> No Users Found </h3>
                <p className="text">Sorry... No users were found!</p>
            </div>
        )
        
    //map users
    return (
        <div className="list-users-container">
            { users.map(user => <UserCard key={user._id} user={user} />) }
        </div>
    )
}

export default ListUsers;
