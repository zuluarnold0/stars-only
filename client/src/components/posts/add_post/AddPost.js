//packages
import React, { useState, useEffect } from 'react';
import { FaCamera } from  "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import Resizer from "react-image-file-resizer";

//local
import { addPostContentAction,  clearPostMessageAction } from '../../../store/actions/postsAction';
import PostModal from '../post_modal/PostModal';
import { addImageHelper } from '../../../helper_methods/addImage';
import './AddPost.css';

const AddPost = () => {
    
    //initialize state
    const [ file, setFile ] = useState(null);
    const [ content, setContent ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ err, setErr ] = useState('');
    const [ url, setUrl ] = useState('');

    //get data from redux state
    const token = useSelector((state) => state.auth.token);
    const content_msg = useSelector((state) => state.posts.posts_content_message);
    const content_loading = useSelector((state) => state.posts.posts_content_isLoading)

    //set input to state [content] when user types
    const onHandleContent = (e) => setContent(e.target.value);

    //show success message in green and error in red
    const messageClass = (message, str) => message.includes(str) ? 'post-content-success-msg' : 'post-content-error-msg';

    //clear messages after 5 sec
    const dispatchClear = useDispatch();
    setTimeout(() => {
        if (content_msg.length > 0) {
            dispatchClear(clearPostMessageAction());
        }
    }, 5000);

    //when file is selected: resize and set to state [file]
    const handleFileChange = e => {
        if (e.target.files[0]) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0], 500, 500, "JPEG", 100, 0,
                    (uri) => { setFile(uri) }, "base64", 300, 300
                );
            } catch (err) {
                //console.log(err);
            }
        }
    }
    
    //set content message from redux state
    useEffect(() => {
        if (content_msg.length) {
            setMessage(content_msg);
        }
    }, [content_msg, setMessage])
 
    //send post and image url to mongodb
    const dispatchPostContent = useDispatch();
    const onSubmitPost = async e => {
        e.preventDefault();
        const newPost = { content };
        
        //if image upload fails, don't upload the entire post
        if (file) {
            addImageHelper(file, setErr, setUrl);
            if (err) {
                setFile(null);
                setMessage(err);
                return ;
            }
            if (url) {
                newPost.post_img = url;
                setFile(null);
            }
        }
        dispatchPostContent(addPostContentAction(token, newPost));
        setContent('');
    }

    return (
        <form className='upload-post'
            onSubmit={(e) => onSubmitPost(e)}
        >
            <h3 className='upload-post-header'>Add Post</h3>
            <input
                autoComplete='off'
                type='text'
                name='post'
                value={content}
                placeholder='Say something...'
                onChange={(e) => onHandleContent(e)}
            />
            <br />
            <label className="post-upload-label" htmlFor="post_img_upload">
                <FaCamera />
                <span className="post-upload-label-text">{" Click to choose photo"}</span>
                <input
                    style={{display:"none"}}
                    id="post_img_upload"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleFileChange(e)}
                />
            </label>
            { file ? <span className='post-upload-file-name'>{file.name}</span> : '' }
            <br />
            {
                //disable the button if they is no file and no content
                (file !== null || content !== '') ?
                    <button 
                        className='post-button'
                        disabled={content_loading}
                    >Upload Post</button>
                    :
                    <button className='post-button' disabled >Upload</button>
            }
            {
                message ?
                    <PostModal>
                        <p className={messageClass(message, 'successfully')}>
                            { message }
                        </p>
                    </PostModal>
                     : ''
            }
        </form>
    )
}

export default AddPost;