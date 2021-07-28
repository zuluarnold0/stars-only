//packages
import React from 'react';
import { Redirect } from 'react-router-dom';

//local
import './PageNotFound.css';
import SideBar from '../side_bar/SideBar';

const PageNotFound = () => {
    const token = window.sessionStorage.getItem('token');

    if (!token) {
        return <Redirect to='/auth/signin' />;
    }
    return (
        <div className='page-not-found-box'>
            <div className='dash-board-side-bar'>
                <SideBar />
            </div>
            <div className='page-not-found'>
                <h2 className="heading"> 404 Page Not Found </h2>
                <p className="text"> Ooops The Requested Page Does not Exist </p>      
            </div>
        </div>
    )
}

export default PageNotFound;