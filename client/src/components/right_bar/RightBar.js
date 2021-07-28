//packages
import React from 'react';
import { FaUsers, FaVideo, FaQuestionCircle, FaBook, FaSuitcase, FaBookmark, FaCalendarCheck } from  "react-icons/fa";

//local
import './RightBar.css';

const RightBar = ({ openModal }) => {

    return (
        <div className='right-bar'>
            <div className='right-bar-box'>
                <ul className='right-bar-list'>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaVideo className='right-bar-item-icon'/>
                        <span className='right-bar-item-text'>Videos</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaUsers className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Groups</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaCalendarCheck className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Events</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaBook className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Courses</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaSuitcase className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Jobs</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaBookmark className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Bookmarks</span>
                    </li>
                    <li className='right-bar-item' onClick={() => openModal()}>
                        <FaQuestionCircle className='right-bar-item-icon' />
                        <span className='right-bar-item-text'>Questions</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RightBar;