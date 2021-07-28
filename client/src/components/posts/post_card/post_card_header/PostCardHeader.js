import React, { Fragment } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const PostCardHeader = ({ post }) => {
    
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return <Fragment>
        <div className='post-card-header'>
                <div className='post-card-header-img-box'>
                    <img
                        className='post-card-header-img'
                        src={post.profile_pic ? post.profile_pic : PIC} 
                        alt='img'
                    />
                </div>
                <div className='post-card-header-text'>
                    <Link className='link' to={`/profile/${post.authorId}`}>
                        <span className='post-card-header-name'>{capitalizeStr(post.firstname) + ' ' + capitalizeStr(post.lastname)}</span>
                    </Link>
                    <span className='post-card-header-time'>{format(post.createdAt)}</span>
                </div>
            </div>
            <div className='post-card-container-content'>{post.content ? post.content : ''}</div>
            {
                post.post_img === '' ? '' :
                    <img
                        className='post-card-content-image'
                        src={post.post_img} 
                        alt='img' 
                    />
            }
    </Fragment>
}

export default PostCardHeader;