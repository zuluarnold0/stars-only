//packages
import React from 'react';

//local
import './SearchBar.css';

const SearchBar = ({ searchUser, setSearchUser }) => {
    //search-bar with controlled input
    return (
        <div className='search-bar-container'>
            <div className='search-bar-content'>
                <input
                    autoComplete='off'
                    className='search-bar-content-input'
                    name='searchUser'
                    value={searchUser}
                    type='text'
                    placeholder='Search for a user...'
                    onChange={(e) => setSearchUser(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar;