//packages
import React from 'react';
import { format } from 'timeago.js';

//local
import './ChatCard.css';

const ChatCard = ({ chat, currentUser, friend }) => {

    //if they is no user show this message so that the app doesnt break
    if (!friend)
        return <div></div>

    //if the user has no image show a nopic image in assets folder
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //show the user on the right if its current user and left if its other user
    const whosWho = () => {
        if (chat.senderId === currentUser._id) {
            return {
                cls: 'self',
                pic: currentUser.profile_pic
            }
        } else {
            return {
                cls: 'friend',
                pic: friend.profile_pic
            }
        }
    }

    return (
        <div className={`chat-card-container ${whosWho().cls}`}>
            <div className={`chat__card`}>
                <div className="chat__photo">
                    <img src={whosWho().pic ? whosWho().pic : PIC} alt='img' />
                </div>
                <div className="chat__message">
                    <p className='chat-message-text'>{ chat.chat }</p>
                    {
                        !chat.chat_img ? '' : 
                        <div className='chat_img'>
                            <img src={chat.chat_img} alt='img' />
                        </div>
                    }
                </div>
            </div>
            <div className='chat-card-time'>
                <span className="chat__time">{ format(chat.createdAt) }</span>
            </div>
        </div>
    )
}

export default ChatCard;
