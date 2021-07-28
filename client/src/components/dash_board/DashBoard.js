//packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//local
import './DashBoard.css';
import SideBar from '../side_bar/SideBar';
import Posts from '../posts/Posts';
import AddPost from '../posts/add_post/AddPost';
import RightBar from '../right_bar/RightBar';
import RightBarModal from '../right_bar/right_bar_modal/RightBarModal';
import Followings from '../followings/Followings';
import FollowingsSkeleton from '../followings/followings_skeleton/FollowingsSkeleton';
import SideBarSkeleton from '../side_bar/side_bar_skeleton/SideBarSkeleton';

const DashBoard = () => {
    //initialize state of the right-bar modal
    const [showRightBarModal, setShowRightBarModal] = useState(false);

    //show or hide modal when a list item is clicked
    const openRightBarModal = () => setShowRightBarModal(true);
    const closeRightBarModal = () => setShowRightBarModal(false);

    //show modal for 4 sec then clear
    setTimeout(() => {
        showRightBarModal && setShowRightBarModal(false);
    }, 4000);

    //fetch data from redux state
    const currentUser = useSelector((state) => state.profile.currentUser);
    const loading = useSelector((state) => state.profile.isLoading);
    const token = useSelector((state) => state.auth.token);

    //if no token show signin page
    if (!token)
        return <Redirect to='/auth/signin' />;
    
    /** THIS CONDITION IS YET TO BE IMPLEMENTED */
    if (!currentUser && !loading)
        return <Redirect to='/auth/signin' />;

    return (
        <div className='dash-board'>
            <div className='dash-board-side-bar'>
                {
                    loading ? <SideBarSkeleton /> : <SideBar currentUser={currentUser}/>
                }
            </div>
            <div className='dash-board-posts'>
                <AddPost />
                <Posts />
            </div>
            <div className='dash-board-right-bar'>
                {
                    loading ?
                        <div className='dash-board-followings-card-sk'>
                            <FollowingsSkeleton />
                        </div>
                        :
                        <div className='dash-board-followings-card'>
                            <Followings id={currentUser._id} />
                        </div>
                }
                <RightBar openModal={openRightBarModal}/>
                <div className='dash-board-right-bar-message-box'>
                    <h4 className='dash-board-right-bar-message-heading'>
                        Quote of the day
                    </h4>
                    <p className='dash-board-right-bar-message-txt'>
                        "It's the lack of faith that makes people afraid of meeting challenges. And I believe in myself" ~ 
                        <span className='message-text-author'>Muhammad Ali</span>
                    </p>
                </div>
            </div>
            {
                showRightBarModal ?
                <RightBarModal closeModal={closeRightBarModal}>
                    <p className='right-bar-modal-message'>Sorry this route is under maintainance. Please try again later.</p>
                </RightBarModal>: ''
            }
        </div>
    );
}

export default DashBoard;