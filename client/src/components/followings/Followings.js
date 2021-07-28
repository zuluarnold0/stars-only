//packages
import React, { useEffect } from 'react';
import { FaChevronRight } from  "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

//local
import './Followings.css';
import FollowingsList from './FollowingsList';
import FollowingsSkeleton from './followings_skeleton/FollowingsSkeleton';
import { fetchFollowingsAction } from '../../store/actions/usersAction';

const Followings = ({ id }) => {

    //get following users from global state
    const followings = useSelector((state) => state.users.followings);
    const loading = useSelector((state) => state.users.followings_isLoading);

    //get currently logged in user
    const currentUser = useSelector((state) => state.profile.currentUser);

    const dispatchFetch = useDispatch();
    const token = window.sessionStorage.getItem('token');

    useEffect(() => {
        dispatchFetch(fetchFollowingsAction(id, token));
    }, [dispatchFetch, token, id]);

    if (loading) {
        return <FollowingsSkeleton />
    }

    if (!followings.length && !loading) {
        return (
            <div className='no-followings'>
                {
                    currentUser && id === currentUser._id ?
                        <p className='no-followings-heading'>You have no followings</p>
                        : ''
                }
            </div>
        )
    }
    
    let clickCount = 0;
    const slideRight = () => {
        clickCount++;
        const friendsCard = document.querySelector('.followings');
        const itemLength = friendsCard.querySelectorAll("img").length;

        if (itemLength - (4 + clickCount) >= 0) {
            friendsCard.style.transform = `translateX(${
                friendsCard.computedStyleMap().get('transform')[0].x.value - 90
            }px)`;
        } else {
            friendsCard.style.transform = `translateX(0)`;
            clickCount = 0;
        }
    }

    return (
        <div className='followings-wrapper'>
            <div className='followings'>
                <FollowingsList followings={followings} />
            </div>
            <FaChevronRight 
                className='followings-arrow'
                onClick={() => slideRight()}
            />
        </div>
    )
}

export default Followings;
