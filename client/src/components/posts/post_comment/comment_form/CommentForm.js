import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './CommentForm.css';
import { submitCommentAction } from '../../../../store/actions/postsAction';

const CommentForm = ({ post_id }) => {
    
    const token = window.sessionStorage.getItem('token');
    const [ comment, setComment ] = useState('');

    const submitComment = useDispatch();

    const handleSubmit = () => {
        if (comment.length > 0) {
            submitComment(submitCommentAction(post_id, comment, token));
            setComment('');
        }
    }

    const isLoading = useSelector((state) => state.posts.comment_isLoading);

    return (
        <div className="comment-form">
            <div className='comment-form-label-input-box'>
                <label className='comment-form-label'>Type your comment</label><br/>
                <input
                    className='comment-form-input'
                    autoComplete='off'
                    type="text" 
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            {
                (!comment.length || isLoading)  ?
                    <button
                        className='comment-button-disabled'
                        disabled={isLoading}
                        type="submit" 
                    > Comment </button>
                    :
                    <button
                        onClick={() => handleSubmit()}
                        className='comment-button'
                        disabled={isLoading}
                        type="submit" 
                    > Comment </button>
            }
        </div>
    )
}

export default CommentForm;
