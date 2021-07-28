//packages
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCamera } from  "react-icons/fa";
import Resizer from "react-image-file-resizer";

//local
import './ProfileInfo.css';
import UploadModal from '../upload_modal/UploadModal';
import ProfileInfoSkeleton from './profile_info_skeleton/ProfileInfoSkeleton';
import UpdateInfoForm from '../update/update_info_form/UpdateInfoForm';
import UpdateEmailForm from '../update/update_email_form/UpdateEmailForm';
import UpdatePasswordForm from '../update/update_password_form/UpdatePasswordForm';
import UpdateModal from '../update_modal/UpdateModal';
import { clearProfileMsgsAction, uploadProfileImageAction } from '../../../store/actions/profileAction';
import ProgressBar from '../../progress_bar/ProgressBar';

const ProfileInfo = () => {
    //initilize file and messages
    const [ file, setFile ] = useState(null);
    const [ message, setMessage ] = useState('');

    //initialize modals
    const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
    const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

    //show and hide info modal
    const openUpdateInfoModal = () => setShowUpdateInfoModal(true);
    const closeUpdateInfoModal = () => setShowUpdateInfoModal(false);
    
    //show and hide email modal
    const openUpdateEmailModal = () => setShowUpdateEmailModal(true);
    const closeUpdateEmailModal = () => setShowUpdateEmailModal(false);

    //show and hide password modal
    const openUpdatePasswordModal = () => setShowUpdatePasswordModal(true);
    const closeUpdatePasswordModal = () => setShowUpdatePasswordModal(false);

    //get data from global state
    const token = useSelector((state) => state.auth.token);
    const currentUser = useSelector((state) => state.profile.currentUser);
    const loading = useSelector((state) => state.profile.isLoading);
    const upload_pic_message = useSelector((state) => state.profile.profile_img_message);
    const userPosts = useSelector((state) => state.posts.current_user_posts);

    //use no-pic image if the user has no profile img
    const PIC = process.env.REACT_APP_NOPIC_IMG;

    //set upload messages from global state
    useEffect(() => {
        if (upload_pic_message.length) {
            setMessage(upload_pic_message);
        }
    }, [upload_pic_message, setMessage])

    //green for success messages and red for failure messages
    const messageClass = (message, str) => message.includes(str) ? 'profile-upload-success-msg' : 'profile-upload-error-msg';
    
    //clear upload pic message after 5 sec
    const dispatchClear = useDispatch();
    setTimeout(() => {
        upload_pic_message && dispatchClear(clearProfileMsgsAction());
    }, 5000);

    //when file is selected: resize and set to state when 
    const handleFileChange = e => {
        if (e.target.files[0]) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0], 600, 600, "JPEG", 100, 0,
                    (uri) => { setFile(uri) }, "base64", 300, 300
                );
            } catch (err) {
                //console.log(err);
            }
        }
    }

    //send profile image to mongodb
    const dispatchProfileImage = useDispatch();
    const sendFile = url => {
        dispatchProfileImage(uploadProfileImageAction(token, url));
    }

    //controlling str length and case to prevent overflow and for uniform display
    const trimStr = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;
    const capitalizeStr = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    //show loading skeleton while fetching data
    if (loading)
        return <ProfileInfoSkeleton />
    
    /**NB: Still to be improved */
    if (!currentUser && !loading) 
        return <div></div>
    
    return (
        <div className='profile-info-left-box'>
            <div className='profile-left-pic-box'>
                <img 
                    className='profile-left-pic'
                    src={currentUser.profile_pic ? currentUser.profile_pic : PIC}
                    alt='img'
                />
                <label className="profile-left-pic-upload-pic-box" htmlFor="profile">
                    <FaCamera className='profile-left-pic-upload-icon'/>
                    <input
                        style={{display:"none"}}
                        id="profile"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e)}
                    />
                </label>
            </div>
            <div className='profile-left-name-gender'>
                <p className='profile-left-name'>
                    { trimStr(capitalizeStr(currentUser.firstname), 12)}
                </p>
            </div>
            <span 
                className='profile-left-update-info'
                onClick={() => openUpdateInfoModal()}
            >
                Update info
            </span>
            <br />
            <div className='profile-left-followers-followings-posts'>
                <div className='profile-left-followers'>
                    <p className='profile-left-count'>{currentUser.followers.length}</p>
                    <span className='profile-left-text'>Followers</span>
                </div>
                <div className='profile-left-followings'>
                    <p className='profile-left-count'>{currentUser.followings.length}</p>
                    <span className='profile-left-text'>Followings</span>
                </div>
                <div className='profile-left-posts'>
                    <p className='profile-left-count'>{userPosts.length}</p>
                    <span className='profile-left-text'>Posts</span>
                </div>
            </div>
            <div className='profile-left-user-info'>
                <p className='profile-left-user-info-heading'>User Info</p>
                <p className='profile-left-user-info-detail'>{capitalizeStr(currentUser.firstname) + ' ' + capitalizeStr(currentUser.lastname)}</p>
                <p className='profile-left-user-info-detail'>{currentUser.gender ? capitalizeStr(currentUser.gender) : ''}</p>
                <p className='profile-left-user-info-detail'>{currentUser.location}</p>
                <p className='profile-left-user-info-detail-bio'>{currentUser.bio}</p>
            </div>
            <div className='profile-left-update-email-password-container'>
                <p className='profile-left-emai-password-update' 
                    onClick={() => openUpdateEmailModal()}
                >
                    Click to update email
                </p>
                <p className='profile-left-emai-password-update'
                    onClick={() => openUpdatePasswordModal()}
                >
                    Click to update password
                </p>
            </div>
            {
                //uploading profile image, show the upload modal
                file ?
                    <UploadModal>
                        <h3 className='profile-uploading-header'>Your profile image is uploading:</h3>
                        <ProgressBar
                            file={file}
                            setFile={setFile}
                            sendFile={sendFile}
                            setMessage={setMessage}
                        />
                    </UploadModal>
                     : ''
            }
            {
                //upload pic message modal
                message ?
                    <UploadModal>
                        <p className={messageClass(message, 'successfully')}>
                            { message }
                        </p>
                    </UploadModal>
                     : ''
            }
            {
                //update profile info modal
                showUpdateInfoModal ?
                    <UpdateModal closeModal={closeUpdateInfoModal}>
                        <UpdateInfoForm 
                            user={currentUser}
                            setShowUpdateInfoModal={setShowUpdateInfoModal}
                        />
                    </UpdateModal> : ''
            }
            {
                //update email modal
                showUpdateEmailModal ?
                    <UpdateModal closeModal={closeUpdateEmailModal}>
                        <UpdateEmailForm
                            setShowUpdateEmailModal={setShowUpdateEmailModal}
                        />
                    </UpdateModal> : ''
            }
            {
                //update password modal
                showUpdatePasswordModal ?
                    <UpdateModal closeModal={closeUpdatePasswordModal}>
                        <UpdatePasswordForm
                            setShowUpdatePasswordModal={setShowUpdatePasswordModal}
                        />
                    </UpdateModal> : ''
            }
        </div>
    )
}

export default ProfileInfo;