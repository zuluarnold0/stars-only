import React from 'react';
import Comment from '../comment/Comment';

import './CommentList.css';

const CommentList = ({ post }) => {
    return (
        <div className='comment-list-container'>
            <div className='comment-list-span-box'>
                <span className='comment-list-span'>Comments</span>
            </div>
            {
                !post.comments.length ?
                    <div className='comment-list-no-comments'>
                        <p className='comment-list-no-comments-txt'>No Comments Yet</p>
                    </div>
                    :
                    <div className='comment-list'>
                        { post.comments.map(comment => <Comment key={comment._id} comment={comment} />)}
                    </div>
            }
        </div>
    )
}

export default CommentList;