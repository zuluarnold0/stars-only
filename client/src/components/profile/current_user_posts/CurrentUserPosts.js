//package
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//local
import './CurrentUserPosts.css';
import PostCardSkeleton from '../../posts/post_card/post_card_skeleton/PostCardSkeleton';
import PostCard from '../../posts/post_card/PostCard';
import { fetchCurrentserPostsAction } from '../../../store/actions/postsAction';

const CurrentUserPosts = () => {
    //token to identify current user
    const token = window.sessionStorage.getItem('token');

    //fetch all current user's posts
    const dispatchPosts = useDispatch();
    useEffect(() => {
        dispatchPosts(fetchCurrentserPostsAction(token));
    }, [dispatchPosts, token]);

    //get all current user's posts from the global state
    const loading = useSelector((state) => state.posts.current_user_posts_isLoading);
    const posts = useSelector((state) => state.posts.current_user_posts);

    //show loading skeleton to prevent an app from breaking
    if (loading)
        return (
            <div className='current-user-post-sk-box'>
                <PostCardSkeleton />
            </div>
        )
    
    //show this message if current user has no posts
    if (!posts.length && !loading)
        return (
            <div className='current-user-posts-no-posts'>
                <p className='current-user-posts-no-posts-heading'>
                    You have no posts
                </p>
            </div>
        )
    
    return (
        <div className='current-user-posts-box'>
            { 
                posts.map(post => <PostCard key={post._id} post={post}/>)
            }
        </div>
    )
}

export default CurrentUserPosts;