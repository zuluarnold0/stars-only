import React from 'react';

import './SideBarSkeleton.css';

const SideBarSkeleton = () => {
    return (
        <div className='side-bar-skeleton'>
            <div className='side-bar-skeleton-top'>
                <span className='logo-skeleton'></span>
                <span className='brand-skeleton'></span>
            </div>
            <div className='side-bar-skeleton-center'>
                <div className='side-bar-skeleton-center-item'>
                    <img
                        className='side-bar-skeleton-center-item-img'
                        src={'#'} 
                        alt='img'
                    />
                </div>
                <div className='side-bar-skeleton-center-item-info'>
                    <p className='side-bar-skeleton-center-item-info-name'></p>
                 </div>
            </div>
            <div className='side-bar-skeleton-bottom'>
                <div className='list-side-bar-skeleton'>
                    <div className='list-item-side-bar-skeleton'>
                        <span className='list-item-icon-side-bar-skeleton'> </span>
                        <span className='list-item-text-side-bar-skeleton'></span>
                    </div>
                    <div className='list-item-side-bar-skeleton'>
                        <span className='list-item-icon-side-bar-skeleton'></span>
                        <span className='list-item-text-side-bar-skeleton'></span>
                    </div>
                    <div className='list-item-side-bar-skeleton'>
                        <span className='list-item-icon-side-bar-skeleton'></span>
                        <span className='list-item-text-side-bar-skeleton'></span>
                    </div>
                    <div className='list-item-side-bar-skeleton'>
                        <span className='list-item-icon-side-bar-skeleton'></span>
                        <span className='list-item-text-side-bar-skeleton'></span>
                    </div>
                    <div className='list-item-side-bar-skeleton'>
                        <span className='list-item-icon-side-bar-skeleton'></span>
                        <span className='list-item-text-side-bar-skeleton'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarSkeleton;