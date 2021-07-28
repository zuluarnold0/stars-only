import React from 'react';

import './PostCardSkeleton.css';

const PostCardSkeleton = () => {
    const COUNTER = 1;
    const PostSkeleton = () => (
        <div className='post-card-skeleton'>
            <div className='post-card-skeleton-header'>
                <div className='post-card-skeleton-header-img-box'>
                    <img
                        className='post-card-skeleton-header-img'
                        src={'#'} 
                        alt='img'
                    />
                </div>
                <div className='post-card-skeleton-header-text'>
                    <span className='post-card-skeleton-header-name'></span>
                    <span className='post-card-skeleton-header-time'></span>
                </div>
            </div>
            <div className='post-card-skeleton-container-content'></div>
            <div className='post-card-sk-footer'>
                <div className='post-card-sk-footer-icon-count'>
                    <span className='post-card-sk-footer-icon'></span>
                    <span className='post-card-sk-footer-count'></span>
                </div>
                <div className='post-card-sk-footer-icon-count'>
                    <span className='post-card-sk-footer-icon'></span>
                    <span className='post-card-sk-footer-count'></span>
                </div>
            </div>
        </div>
    )
    return Array(COUNTER).fill().map((item, index) => (<PostSkeleton  key={index} />));
}

export default PostCardSkeleton;