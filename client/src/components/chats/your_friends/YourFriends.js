//package
import React from 'react';
import { FaChevronRight } from  "react-icons/fa";

//local
import './YourFriends.css';
import YourFriendsCard from './your_friends_card/YourFriendsCard'
import YourFriendsSkeleton from './your_friends_skeleton/YourFriendsSkeleton.js';

const YourFriends = ({ loading, conversations, currentUser, handleFriend, handleCurrentConversation }) => {

    //loading skeleton shown while waiting for data
    if (loading)
        return <YourFriendsSkeleton />

    //if there are no conversations show this message
    if (!conversations.length && !loading)
        return (
            <div className='no-friends'>
                <p className='no-friends-text'>You Have No Conversations...</p>
            </div>
        )
    
    //friends scroller function
    let clickCount = 0;
    const slideRight = () => {
    
        clickCount++;
        const friendsCard = document.querySelector('.your-friends-card');
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
        <div className='your-friends-card-wrapper'>
            <div className='your-friends-card'>
                {/**1. g) mapping conversations to friends card */
                    conversations.map(conversation => (
                            <YourFriendsCard 
                                key={conversation._id}
                                handleFriend={handleFriend}
                                conversation={conversation} 
                                currentUser={currentUser} 
                                handleCurrentConversation={handleCurrentConversation}
                            />
                        )
                    )
                }
            </div>
            <FaChevronRight 
                className='your-friends-arrow'
                onClick={() => slideRight()}
            />
        </div>
    )
}

export default YourFriends;
