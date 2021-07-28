import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaRegCommentAlt, FaRegTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './PostCard.css';
import DeletePostModal from '../delete_post_modal/DeletePostModal';
import { deletePostAction } from '../../../store/actions/postsAction';
import PostCardSkeleton from './post_card_skeleton/PostCardSkeleton';
import { useDispatch } from 'react-redux';
import PostCardHeader from './post_card_header/PostCardHeader';

const PostCard = ({ post }) => {
   
    const token = window.sessionStorage.getItem('token');
    
    const PORT = process.env.REACT_APP_BASE_URL;
    
    const [ showDeletePostModal, setShowDeletePostModal ] = useState(false);
    const [ currentPost, setCurrentPost ] = useState(false);

    const openDeletePostModal = () => setShowDeletePostModal(true);
    const closeDeletePostModal = () => setShowDeletePostModal(false);

    //get delete post data from global state
    const delete_post_message = useSelector((state) => state.posts.delete_post_message);
    const delete_post_isloading= useSelector((state) => state.posts.delete_post_isloading);

    const currentUser = useSelector((state) => state.profile.currentUser);
    const loading = useSelector((state) => state.profile.isLoading);

    useEffect(() => {
        setCurrentPost(post);
    }, [setCurrentPost, post]);

    const dispatchDelete = useDispatch();

    const deletePost = () => dispatchDelete(deletePostAction(currentPost._id, token));

    const handleLike = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
            const res = await axios.put(`${PORT}/posts/${currentPost._id}/like`, {}, config);
            setCurrentPost(res.data.post);
        }
        catch(e) {
            //if (e.response.data.message) {}
        }
    }

    const isLiked = () => {
        return currentUser && currentPost.likes.find((id) => id === currentUser._id) ? true : false;
    }

    if (loading)
        return <PostCardSkeleton />;

    if (!loading && !currentPost)
        return <div></div>;

    return (
        <div className='post-card'>
            <PostCardHeader post={currentPost} />
            <div className='post-card-footer'>
                <div className='post-card-footer-icon-count'>
                    <FaRegHeart
                        className={ isLiked() ? 'post-card-footer-icon-liked' : 'post-card-footer-icon'}
                        onClick={() => handleLike()}
                    />
                    <span className='post-card-footer-count'>{currentPost.likes.length}</span>
                </div>
                { 
                    currentUser && (currentUser._id === currentPost.authorId) ?
                        <span
                            onClick={() => openDeletePostModal()}
                        >
                            <FaRegTrashAlt
                                className='post-card-footer-delete'
                            />
                        </span>
                        : ''
                }
                <div className='post-card-footer-icon-count'>
                    <Link className='link' to={`/posts/${currentPost._id}`}>
                        <FaRegCommentAlt  className='post-card-footer-icon'/>
                    </Link>
                    <span className='post-card-footer-count'>{currentPost.comments.length}</span>
                </div>
                {       
                    showDeletePostModal ? 
                        <DeletePostModal
                            deletePost={deletePost}
                            closeDeletePostModal={closeDeletePostModal}
                            delete_post_isloading={delete_post_isloading}
                            delete_post_message={delete_post_message}
                        >
                        </DeletePostModal> : ''
                }
            </div>
        </div>
    )
}

export default PostCard;