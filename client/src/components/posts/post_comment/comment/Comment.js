import React from 'react';
import { format } from 'timeago.js';

import './Comment.css';

const Comment = ({ comment }) => {
    
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    return (
        <div className='comment-comment-card'>
            <div className='comment-comment-card-header'>
                <img className='comment-comment-card-header-img' 
                    src={comment.commentUserProfile_pic ? comment.commentUserProfile_pic : PIC} 
                    alt='img'
                />
                <div className='comment-comment-card-name-time'>
                    <p className='comment-comment-card-name'>{comment.commentUserFirstname}</p>
                    <span className='comment-comment-card-time'>{format(comment.date)}</span>
                </div>
            </div>
            <div className='comment-comment-card-content'>
                { comment.comment }
            </div>
        </div>
    )
}

export default Comment;