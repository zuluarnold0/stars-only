//packages
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//local
import './UpdateInfoForm.css';
import { clearProfileMsgsAction, updateUserInfoAction } from '../../../../store/actions/profileAction';

const UpdateInfoForm = ({ user, setShowUpdateInfoModal }) => {

    const [ firstname, setFirstname ] = useState(user.firstname);
    const [ lastname, setLastname ] = useState(user.lastname);
    const [ bio, setBio ] = useState(user.bio);
    const [ location, setLocation ] = useState(user.location);
    const [ gender, setGender ] = useState(user.gender.toLowerCase());
    
    const token = window.sessionStorage.getItem('token');

    const submitUpdateInfoForm = useDispatch();
    const clearMsgs = useDispatch();

    const message = useSelector((state) => state.profile.update_info_message);
    const isLoading = useSelector((state) => state.profile.update_info_isLoading);

    setTimeout(() => {
        if (message.length > 0) {
            clearMsgs(clearProfileMsgsAction());
            if (message.includes('success')) {
                setShowUpdateInfoModal(false);
            }
        }
    }, 4000);

    const messageClass = (message, str) => {
        return message.includes(str) ? 'update-info-alert-success' : 'update-info-alert-failure-msg';
    }

    const handleFormSubmit = () => {
        submitUpdateInfoForm(updateUserInfoAction({ token, firstname, lastname, bio, gender, location }))
    }

    const isButtonDisabled = loading => loading ? 'update-info-btn-disabled' : 'update-info-btn';
    
    return (
        <div
            className="update-info-form"
        >
            <h3 className="update-info-header">Update Profile Info</h3>
            {
                message ? 
                    <p className={messageClass(message, 'success')}>{ message }</p>
                    : ''
            }
            <div>
                <label>Firstname</label><br/>
                <input
                    type="text" 
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div>
                <label>Lastname</label><br/>
                <input
                    type="text" 
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div>
                <label>Location</label><br/>
                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Gender</label><br/>
                <select
                    className="gender-select-option"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value={gender}
                >
                    <option value="">Choose...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Bio</label><br/>
                <textarea
                    className="bio-text-area-box"
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
            </div>
            <button
                className={isButtonDisabled(isLoading)}
                type="submit"
                onClick={() => handleFormSubmit()}
                disabled={isLoading}
            > Update </button>
        </div>
    )
}

export default UpdateInfoForm;

/*
const formValues = [
            firstname, 
            lastname, 
            location, 
            bio
        ];
        const unAcceptableInputs = {
            0: "alert(", 
            1: "console(",
            2: "localstorage",
            3:  "stringify", 
            4: "JSON.", 
            5: "onerror("
        }*/