import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import SideBar from '../../side_bar/SideBar';
import PostCardHeader from '../post_card/post_card_header/PostCardHeader';
import CommentForm from '../post_comment/comment_form/CommentForm';
import CommentList from '../post_comment/comment_list/CommentList';
import { fetchPostAction } from '../../../store/actions/postsAction';
import './PostItem.css';
import PostCardSkeleton from '../post_card/post_card_skeleton/PostCardSkeleton';

const PostItem = () => {
    
    const postID = useParams().id;
    const dispatchPost = useDispatch();

    //take user to dashboard if logged in
    const token = useSelector((state) => state.auth.token);

    const [ currentPost, setCurrentPost ] = useState(false);

    useEffect(() => {
        token && postID && dispatchPost(fetchPostAction(postID, token));
    }, [dispatchPost, token, postID]);

    const post = useSelector((state) => state.posts.post);
    const post_isloading= useSelector((state) => state.posts.post_isLoading);

    useEffect(() => {
        setCurrentPost(post);
    }, [post]);

    if (!token) {
        return <Redirect to='/auth/signin' />;
    }
    if (post_isloading) {
        return (
            <div className='post-item'>
                <div>
                    <SideBar />
                </div>
                <div className='post-item-post'>
                    <PostCardSkeleton />
                </div>
            </div>
        )
    }
    if (!currentPost && !post_isloading) {
        return (
            <div className='post-item'>
                <div>
                    <SideBar />
                </div>
                <div className='post-item-post post-item-post-not-found'>
                    <h3 className='post-item-post-not-found-heading'>Oooops...</h3>
                    <p className='post-item-post-not-found-text'>Sorry No Post was found...</p>
                </div>
            </div>
        )
    }
    return (
        <div className='post-item'>
            <div className='post-item-side-bar'>
                <SideBar />
            </div>
            <div className='post-item-post'>
                <div className='post-item-post-card-header'>
                    <PostCardHeader post={currentPost}/>
                </div>
                <CommentForm post_id={postID}/>
                <CommentList post={currentPost}/>
            </div>
        </div>
    )
}

export default PostItem;