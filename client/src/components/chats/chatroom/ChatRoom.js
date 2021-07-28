//packages
import React from "react";

//local
import ChatBody from '../chat_body/ChatBody';
import ChatFooter from '../chat_footer/ChatFooter';
import ChatHeader from '../chat_header/ChatHeader';
import './ChatRoom.css';

const ChatRoom = ({ _id, friend, chatMessages, currentUser, sendSocketMessage, handleNewChat }) => {
    
    return (
        <div className='chats-container'>
            <ChatHeader 
                friend={friend}
            />
            <ChatBody
                friend={friend}
                chats={chatMessages}
                currentUser={currentUser}
            />
            <ChatFooter
                _id={_id}
                sendSocketMessage={sendSocketMessage}
                handleNewChat={handleNewChat}
            />
        </div>
    )
}

export default ChatRoom;
