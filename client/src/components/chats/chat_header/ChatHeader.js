//package
import React from 'react';

//local
import './ChatHeader.css';

const ChatHeader = ({ friend }) => {

    //show no pic image from assets folder if the user has no profile pic
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //convert first character of string to uppercase and the rest to lowercase
    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    //if they is no friend show nothing
    if (!friend) {
        return <div className="chats__header">
                <div className="chats-header-no-friend">
                    <img className="chats-header-no-friend-img" src={'#'} alt="img" />
                </div>
                <span className="chats-header-no-friend-span"></span>
            </div>
    }
    return (
        <div className="chats__header">
            <img src={ friend.profile_pic ? friend.profile_pic : PIC } alt="img" />
            <span>{ capitalizeStr(friend.firstname) + ' ' + capitalizeStr(friend.lastname) }</span>
        </div>
    )
}

export default ChatHeader;
