//global state
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import  { io } from 'socket.io-client';
import { Redirect } from 'react-router-dom';

//local
import './Chats.css';
import SideBar from '../side_bar/SideBar';
import ChatRoom from './chatroom/ChatRoom';
import YourFriends from './your_friends/YourFriends';
import { fetchChatsAction, fetchConversationsAction } from '../../store/actions/chatAction';
import FriendsProfile from "./friends_profile/FriendsProfile";
import FriendsProfileSkeleton from "./friends_profile/friends_profile_skeleton/FriendsProfileSkeleton";

const Chats = () => {

    //get token from redux state
    const token = useSelector((state) => state.auth.token);

    //1. a) fetching conversations from mongo db
    const dispatchFetchConv = useDispatch();
    const currentUser = useSelector((state) => state.profile.currentUser);
    
    useEffect(() => {
        token && currentUser && dispatchFetchConv(fetchConversationsAction({ token, id: currentUser._id }));
    }, [dispatchFetchConv, token, currentUser]);

    //1. b) getting conversations from global state and pass to 'YourFriendsCard
    const conversations = useSelector((state) => state.chats.conversations);

    //1. c) conversation id to be fetch via callback from 'YourFriendsCard'
    const [ currentConversation, setCurrentConversation ] = useState([]);
    
    //1. d) friend profile to be fetch via callback from 'YourFriendsCard'
    const [ friend, setFriend ] = useState(null);

    //1. e) callbacks fetching conversation id and friend's profile
    const handleCurrentConversation = conv => setCurrentConversation(conv);
    const handleFriend = friend => setFriend(friend);

    // 2. After getting conv id from YourFriendsCard fetch chat messages
    const dispatchChats = useDispatch();
    useEffect(() => {
        token && currentConversation._id && dispatchChats(fetchChatsAction(token, currentConversation._id));
    }, [dispatchChats, currentConversation._id, token]);

    // 2. b) get chats from global state
    const chats = useSelector((state) => state.chats.chats);
    const chats_loading = useSelector((state) => state.chats.isLoading);
    
    // 2. c) set chats chatMessages array
    const [ chatMessages, setChatMessages ] = useState([]);

    useEffect(() => {
        token && setChatMessages(chats);
    }, [chats, token]);

    //2. e) chat from ChatFooter pushed to chatMessages to be displayed in ChatBody
    const handleNewChat = chat => setChatMessages([...chatMessages, chat]);

    //3. a) create a socket
    //const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT;
    const socket = useRef();
    const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT;
    useEffect(() => {
        if (token) {
            socket.current = io(`ws:${SOCKET_PORT}`);
        }
    }, [token, SOCKET_PORT]);

    //3. b) add active users to socket server
    useEffect(() => {
        if (token) {
            socket.current.emit('addUser', { userId: currentUser?._id });
            socket.current.on('getUsers', (users) => {/*console.log(users)*/ });
        }
    }, [currentUser, token]);

    //4. a) adding user to chat room
    useEffect(() => {
        if (token) {
            (currentUser && currentConversation._id) && socket.current.emit('join', { userId: currentUser._id, room: currentConversation._id });
        }
    }, [token, currentUser, currentConversation._id]);

    //5. get message from ChatFooter and send to socket
    const sendSocketMessage = ({conversationId, chat, chat_img }) => {
        socket.current.emit('sendMessage', {
            chatID: conversationId,
            chatMsg: chat ,
            chat_img,
            senderId: currentUser._id
        });
    }

    //6. getMessage from socket and set to state
    const [ arrivalMessage, setArrivalMessage ] = useState(null);

    useEffect(() => {
        if (token) {
            socket.current.on('getMessage', (data) => {
                setArrivalMessage({
                    _id: data._id,
                    senderId: data.senderId,
                    chat: data.chatMsg,
                    chat_img: data.chat_img,
                    createdAt: Date.now()
                });
            });
        }
    }, [token]);

    //7. message from me must be seen by my friend
    useEffect(() => {
        if (token) {
            arrivalMessage && currentConversation.members.includes(arrivalMessage.senderId)
            && setChatMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, currentConversation, token]);
    

    if (!token)
        return <Redirect to='/auth/signin' />

    return (
        <div className='chats-main-container'>
            <div>
                <SideBar />
            </div>
            <div className='chat-main-box'>
                <div className='chats-chat-room-div'>
                    <div className='chats-chat-room-friends'>
                        {/** 1. f) 
                         * conversations: to map to separate conversations
                         * loading: used while conversations are being fetchded
                         * currentUser: to find other user's profile
                         * handleFriend: callback to get other user's so that its send to ChatHeader
                         * handleCurrentConversation: conversation._id to fetch chats with that user
                        */}
                        <YourFriends
                            loading={chats_loading}
                            currentUser={currentUser}
                            conversations={conversations}
                            handleFriend={handleFriend}
                            handleCurrentConversation={handleCurrentConversation}
                        />
                    </div>
                    <div className='chats-chat-room-box'>
                        {/** 1. i) send friend to ChatHeader */}
                        {/** 2. d) send chatMessages && currentUser to ChatBody */}
                        <ChatRoom
                            _id={currentConversation._id}
                            friend={friend}
                            chatMessages={chatMessages} 
                            currentUser={currentUser}
                            sendSocketMessage={sendSocketMessage}
                            handleNewChat={handleNewChat}
                        />
                    </div>
                </div>
                {
                    friend ? 
                        <div className='chat-user-profile-box'>
                            <FriendsProfile user={friend}/>
                        </div> 
                        :
                        <FriendsProfileSkeleton />
                }
            </div>
        </div>
    )
}

export default Chats;
