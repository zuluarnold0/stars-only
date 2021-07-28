import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const YourFriendsCard = ({ conversation, currentUser, handleFriend, handleCurrentConversation }) => {

    //get token from auth global state
    const token = useSelector((state) => state.auth.token);

    // 1. h)getting conversation friends' profile
    const [ friend, setFriend ] = useState(null);

    const PIC = process.env.REACT_APP_NOPIC_IMG;
    const PORT = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const user_id = conversation.members.find((memberId) => memberId !== currentUser._id);
        
        const fetchUserAction = async () => {
            try {
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
                const res = await axios.get(`${PORT}/users/${user_id}`, config);
                setFriend(res.data.user);
            }
            catch(e) {
                if (e.response.data.message) {}
            }
        }
        fetchUserAction();
    }, [currentUser._id, conversation, PORT, token]);

    const setUserData = (conversation, friend) => {
        handleFriend(friend);
        handleCurrentConversation(conversation);
    }

    if (!friend)
        return <div></div>;
    
    return (
        <div className='your-friends-card-item' onClick={() => setUserData(conversation, friend)} >
            <img
                className='your-friends-card-item-img'
                src={friend.profile_pic ? friend.profile_pic : PIC} 
                alt='img'
            />
        </div>
    )
}

export default YourFriendsCard;