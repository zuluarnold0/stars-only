//packages
import React from 'react';
import { Link } from 'react-router-dom';

//local
import './HomePage.css';

const HomePage = () => {
    const PIC = process.env.REACT_APP_NOCOVER_IMG;
    const PIC1 = process.env.REACT_APP_DISPLAY_IMG1;
    const PIC2 = process.env.REACT_APP_DISPLAY_IMG2;
    const PIC3 = process.env.REACT_APP_DISPLAY_IMG3;
    const PIC4 = process.env.REACT_APP_DISPLAY_IMG4;
    return (
        <div className="home-page">
            <div className='home-page-wrapper'>
                <div className='home-page-wrapper-hero'>
                    <img className='home-page-hero-img' src={PIC} alt='img'/>
                    <div className='home-page-nav'>
                        <div className='home-page-logo-box'>
                            <span className='home-page-logo-left'>Starz</span>
                            <span className='home-page-logo-right'>Only</span>
                        </div>
                        <div className='home-page-logo-sign-in'>
                            <Link className='home-page-nav-button link'  to='/auth/signin'>
                                Sign in
                            </Link>
                        </div>
                        <div className='home-page-content-container'>
                            <p className='home-page-heading'>Starz Only</p>
                            <div className='home-page-main-content'>
                                <p className='home-page-content-txt'>
                                    <strong>Starz only</strong> is a concept project made in <strong>MERN STACK</strong> by <strong> Star Arnold Zulu.</strong>
                                </p>
                                <h4 className='home-page-about-heading'>About the starz only app:</h4>
                                <p className='home-page-content-txt'>
                                    A user can register if new to the app. Log in if already has an account. Update profile info, upload profile images and view other users profile.
                                    He/she can also create a post, like, comment and delete his/her own post, follow and also chat with other users.
                                </p>
                                <p className='home-page-content-txt home-page-last-txt'>
                                    Register today <strong>and get inspired to build your own apps </strong>
                                    or just <strong> hire me</strong> to build yourz.
                                </p>
                                <Link className='home-page-content-button link' to='/auth/signup'>
                                    Sign Up
                                </Link>
                            </div>
                            <p className='home-page-heading-text'>Disclaimer: App still under development</p>
                        </div>
                    </div>
                </div>
                <div className='home-page-showcase-wrapper'>
                    <div className='home-page-project-display'>
                        <h2 className='home-page-project-display-heading'>User Profile Page</h2>
                        <img className='home-page-project-img' src={PIC2} alt='img'/>
                        
                        <h2 className='home-page-project-display-heading'>Users Page</h2>
                        <img className='home-page-project-img' src={PIC4} alt='img'/>

                        <h2 className='home-page-project-display-heading'>Current User Page</h2>
                        <img className='home-page-project-img' src={PIC3} alt='img'/>
    
                        <h2 className='home-page-project-display-heading'>Dashboard Page</h2>
                        <img className='home-page-project-img' src={PIC1} alt='img'/>
                    </div>
                </div>
                <footer>
                    <div className='home-page-footer'>
                        <p className='home-page-footer-item'>Email: zuluarnold0@gmail.com </p>
                        <p className='home-page-footer-item'> star arnold © 2021</p>
                        <p className='home-page-footer-item'>LinkedIn: <Link className='home-page-link' to='https://www.linkedin.com/in/arnold-zulu-532539150/'>Arnold Zulu</Link> </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default HomePage;



