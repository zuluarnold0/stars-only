//packages
import React from 'react';
import { useDispatch } from 'react-redux';
import { FaUser, FaUsers, FaHome, FaCommentAlt, FaStar, FaPowerOff } from  "react-icons/fa";
import { Link } from 'react-router-dom';

//local
import './SideBar.css';
import { logOut } from '../../store/actions/authAction';

const SideBar = ({ currentUser }) => {
    //display no-user-pic if the user has no profile pic
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //logout user from firebase
    const dispatchLogout = useDispatch();
    const manageReduxState = () => {
        dispatchLogout(logOut());
    }

    //control str length and case to prevent overflow and for uniform display
    const trimStr = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;
    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div className='side-bar'>
            <div className='side-bar-top'>
                <FaStar className='logo'/>
                <span className='brand'>StarzOnly</span>
            </div>
            <div className='side-bar-center'>
                <div className='side-bar-center-item'>
                    <img
                        className='side-bar-center-item-img'
                        src={currentUser.profile_pic ? currentUser.profile_pic : PIC} 
                        alt='img'
                    />
                </div>
                <div className='side-bar-center-item-info'>
                    <p className='side-bar-center-item-info-name'>{ trimStr(capitalizeStr(currentUser.firstname), 9) }</p>
                 </div>
            </div>
            <div className='side-bar-bottom'>
                <ul className='list'>
                    <Link className='link' to='/'>
                        <li className='list-item'>
                            <FaHome className='list-item-icon' />
                            <span className='list-item-text'>Home</span>
                        </li>
                    </Link>
                    <Link className='link' to='/profile'>
                        <li className='list-item'>
                            <FaUser className='list-item-icon' />
                            <span className='list-item-text'>Profile</span>
                        </li>
                    </Link>
                    <Link className='link' to='/chats'>
                        <li className='list-item'>
                            <FaCommentAlt className='list-item-icon' />
                            <span className='list-item-text'>Chat</span>
                        </li>
                    </Link>
                    <Link className='link' to='/users'>
                        <li className='list-item'>
                            <FaUsers className='list-item-icon' />
                            <span className='list-item-text'>Users</span>
                        </li>
                    </Link>
                    <Link 
                        className='link' 
                        to='/auth/signin'
                        onClick={() => manageReduxState()}
                    >
                        <li className='list-item sign-out-item'>
                            <FaPowerOff className='list-item-icon' />
                            <span className='list-item-text'>LogOut</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;