//packages
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from "react-image-file-resizer";

//local
import './ProfileCover.css';
import UploadModal from '../upload_modal/UploadModal';
import { clearProfileMsgsAction, coverImageAction } from '../../../store/actions/profileAction';
import ProfileCoverSkeleton from './profile_cover_skeleton/ProfileCoverSkeleton';
import ProgressBar from '../../progress_bar/ProgressBar';

const ProfileCover = () => {
    //show this cover image if the user has no cover image
    const COVER = process.env.REACT_APP_NOCOVER_IMG;
    
    //initialize file and error
    const [ file, setFile ] = useState(null);
    const [ message, setMessage ] = useState('');

    //show success message in green and error in red
    const messageClass = (message, str) => {
        return message.includes(str) ? 'uploading-cover-success-msg' : 'uploading-cover-error-msg';
    }

    //clear upload images after 5 sec
    const dispatchClear = useDispatch();
    setTimeout(() => {
        message && dispatchClear(clearProfileMsgsAction());
    }, 5000);

    //send cover image to mongodb
    const dispatchCoverImage = useDispatch();
    const sendFile = url => {
        dispatchCoverImage(coverImageAction(token, url));
    }

    //get data from global state
    const token = useSelector((state) => state.auth.token);
    const upload_cover_message = useSelector((state) => state.profile.profile_img_message);
    const currentUser = useSelector((state) => state.profile.currentUser);
    const loading = useSelector((state) => state.profile.isLoading);

    //set messages from global state
    useEffect(() => {
        if (upload_cover_message.length) {
            setMessage(upload_cover_message);
        }
    }, [upload_cover_message, setMessage])

    
    //when file is selected: resize and set to state when 
    const handleFileChange = e => {
        if (e.target.files[0]) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0], 620, 620, "JPEG", 100, 0,
                    (uri) => { setFile(uri) }, "base64", 600, 600
                );
            } catch (err) {
                //console.log(err);
            }
        }
    }

    //if cover image is loading show the skeleton
    if (loading)
        return <ProfileCoverSkeleton />

    /**NB: TO BE IMPLEMENTED */
    if (!loading && !currentUser)
        return <div></div>

    return (
        <Fragment>
            <div className='profile-right-upload-cover-box'>
                <div className='profile-right-cover-box'>
                    <img
                        className='profile-right-cover'
                        src={currentUser.profile_cover ? currentUser.profile_cover :  COVER}
                        alt='img'
                    />
                </div>
                <label className="" htmlFor="cover_img">
                    <span className="profile-right-upload-cover">{"Change Cover"}</span>
                    <input
                        style={{display:"none"}}
                        id="cover_img"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e)}
                    />
                </label>
            </div>
            {
                //uploading cover image, show the upload modal
                file ?
                    <UploadModal>
                        <h3 className='cover-uploading-header'>Your cover image is uploading:</h3>
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
                //after uploading show success or error message
                message ?
                    <UploadModal>
                        <p className={messageClass(message, 'successfully')}>
                            { message }
                        </p>
                    </UploadModal>
                    : ''
            }
        </Fragment>
    )
}

export default ProfileCover;