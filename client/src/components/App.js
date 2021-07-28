//packages
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//local
import './App.css';
import HomePage from './home/HomePage';
import SignUp from './auth/sign_up/SignUp';
import SignIn from './auth/sign_in/SignIn';
import Forgot from './auth/forgot/Forgot';
import DashBoard from './dash_board/DashBoard';
import PostItem from './posts/post_item/PostItem';
import Users from './users/Users';
import UserProfile from './users/user_profile/UserProfile';
import Profile from './profile/Profile';
import Chats from './chats/Chats';
import PageNotFound from './page_not_found/PageNotFound';
import { fetchMyProfileAction } from '../store/actions/profileAction';
import { firebaseAuth } from '../config/firebase';

const App = () => {
  
  //when user is loggedin grab firebase-token and fetch user profile from mongodb
  const dispatchFetchProfile = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async(user) => {
      if (user) {
        const token = await user.getIdTokenResult().token;
        dispatchFetchProfile(fetchMyProfileAction(token));
      }
    })
    return () => unsubscribe();
  }, [dispatchFetchProfile]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route path="/auth/signin" component={SignIn} />
        <Route path="/auth/signup" component={SignUp} />
        <Route path="/auth/forgot" component={Forgot} />
        <Route path="/posts/:id" component={PostItem} />
        <Route path="/users" component={Users} />
        <Route path="/user/:id" component={UserProfile} />
        <Route path="/profile" component={Profile} />
        <Route path="/chats" component={Chats} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
