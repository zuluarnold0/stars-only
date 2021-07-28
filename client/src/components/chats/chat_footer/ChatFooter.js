//packages
import React, { useEffect, useState } from "react";
import { FaCamera } from  "react-icons/fa";
import axios from 'axios';
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

//local
import './ChatFooter.css';
import { addImageHelper } from "../../../helper_methods/addImage";

const ChatFooter = ({ _id, handleNewChat, sendSocketMessage }) => {

    //fetch token from global state
    const token = useSelector((state) => state.auth.token);

    //back-end port
    const PORT = process.env.REACT_APP_BASE_URL;

    //initialize state of properties
    const [ file, setFile ] = useState(null);
    const [ chat, setChat ] = useState('');
    const [ err, setErr ] = useState('');
    const [ url, setUrl ] = useState('');

    //set chat message to state when input is typed
    const onHandleChat = e => setChat(e.target.value);

    //resize chat img and set to state when selected
    const handleFileChange = e => {
        if (e.target.files[0]) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0], 250, 250, "JPEG", 100, 0,
                    (uri) => { setFile(uri) }, "base64", 200, 200
                );
            } catch (err) {
                //console.log(err);
            }
        }
    }

    //clear chat and file when id changes
    useEffect(() => {
        setChat('');
        setFile(null);
    }, [_id]);

    //if image send to firebase then send post to mongodb
    const onSubmitChat = async () => {
        const newChat = { chat };
        
        if (file) {
            addImageHelper(file, setErr, setUrl);
            if (err) {
                setFile(null);
                return ;
            }
            if (url) {
                newChat.chat_img = url;
                setFile(null);
            }
        }

        //send chat message and img url to mongodb
        try {
            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
            newChat.conversationId = _id;

            const bodyChat = JSON.stringify(newChat);
            const res = await axios.post(`${PORT}/chats`, bodyChat, config);
            //handleNewChat(res.data.chat);

            //send response to 
            /*NB: this callback is from Chat component*/
            sendSocketMessage(res.data.chat);
            setChat('');
        }
        catch(e) {
            //console.log(msg);
        }
    }

    return (
        <div className="chats__footer">
            <textarea
                autoComplete='off'
                className="chat-footer-text-area"
                type='text'
                value={chat}
                name='chat'
                placeholder='Please type your message here...'
                onChange={(e) => onHandleChat(e)}
            ></textarea>
            <br />
            <label className="chat-upload-label" htmlFor="file">
                <FaCamera />
                <span>{" Click to upload image"}</span>
                <input
                    style={{display:"none"}}
                    id="file"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleFileChange(e)}
                />
            </label>
            {
                ((file !== null || chat !== '') && _id) ?
                    <button className='chat-footer-button' onClick={() => onSubmitChat()}>Send</button>
                    :
                    <button className='chat-footer-button' disabled>Send</button>
            }
        </div>
    )
}

export default ChatFooter;
