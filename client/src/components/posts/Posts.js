//packages
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//local
import './Posts.css';
import PostCard from './post_card/PostCard';
import { fetchPostsAction } from '../../store/actions/postsAction';
import PostCardSkeleton from './post_card/post_card_skeleton/PostCardSkeleton';

const Posts = () => {
    //token to identify logged in users
    const token = window.sessionStorage.getItem('token');

    //fetch posts from database
    const dispatchPosts = useDispatch();
    useEffect(() => {
        dispatchPosts(fetchPostsAction(token));
    }, [dispatchPosts, token]);

    //get posts from global state
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.posts_isLoading);
    
    //loading skeleton to prevent app from breaking while fetching data
    if (loading)
        return (
            <div className='posts-container'>
                <PostCardSkeleton />
            </div>
        )

    //show this message if they are no posts
    if (!posts.length && !loading) {
        return (
            <div className='posts-container no-posts-container'>
                <h3 className='no-posts-heading'>
                    Sorry No Posts where found...
                </h3>
                <p className='no-posts-text'>
                    Create your own posts or 'follow' other users 
                    inorder to view their posts
                </p>
            </div>
        )
    }
    
    return (
        <div>
        { 
            posts.map(post => {
                    return (
                        <div className='posts-container' key={post._id}>
                            <PostCard post={post}/>
                        </div>
                    )
                }
            )
        }
        </div>
    )
}

export default Posts;