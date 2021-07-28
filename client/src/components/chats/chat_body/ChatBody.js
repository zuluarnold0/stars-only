//packages
import React, { useRef, useEffect } from 'react';

//local
import ChatCard from '../chat_card/ChatCard';
import './ChatBody.css';

const ChatBody = ({ chats, currentUser, friend }) => {
    //scroll to the latest message
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);
    
    //if they are no chats show this message so that the app doesnt break
    if (!chats.length) {
        return <div className='chats__body'>
            <p className='chat-body-no-chats'>
                Nothing to display... <br/>Start new conversation...
            </p>
        </div>
    }
    return (
        <div className="chats__body">
            {
                chats?.map(chat => (
                    <div key={chat._id} ref={scrollRef}>
                        { 
                            <ChatCard 
                                chat={chat} 
                                currentUser={currentUser}
                                friend={friend}
                            /> 
                        }
                    </div>
                    )
                )
            }
        </div>
    )
}

export default ChatBody;
