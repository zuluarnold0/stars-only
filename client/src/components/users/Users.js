//packages
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

//local
import './Users.css';
import SideBar from '../side_bar/SideBar';
import ListUsers from './list_users/ListUsers';
import SearchBar from './search_bar/SearchBar';
import { fetchUsersAction } from '../../store/actions/usersAction';

const Users = () => {
    //token to identify logged in users when requesting data or accessing some routes
    const token = useSelector((state) => state.auth.token);
    
    //fetch users from mongodb
    const dispatchFetch = useDispatch();

    useEffect(() => {
        token && dispatchFetch(fetchUsersAction(token));
    }, [dispatchFetch, token]);

    //data from global state
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.users_isLoading);

    //initialize searche name for input
    const [ searchUser, setSearchUser ] = useState('');

    //filter user with respect to searched name before displaying
    const filteredUsers = users && users.filter((user) => user.firstname.toLowerCase().includes(searchUser.toLowerCase()));

    //only logged in users can view other users
    if (!token)
        return <Redirect to='/auth/signin' />
    
    return (
        <div className='users-container'>
            <div>
                <SideBar />
            </div>
            <div className='users'>
                <SearchBar
                    searchUser={searchUser}
                    setSearchUser={setSearchUser}
                />
                <div className='users-search-count'>
                    { filteredUsers.length + " users" }
                </div>
                <ListUsers
                    loading={loading}
                    users={filteredUsers}
                />
            </div>
        </div>
    )
}

export default Users;
