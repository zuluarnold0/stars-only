//packages
import React, { useEffect } from 'react';

//local
import './ProgressBar.css';
import { useStorage } from "../../hooks/useStorage";

const ProgressBar = ({ file, setFile, sendFile, setMessage }) => {
    //get url and file upload error message
    const { url, err, progress } = useStorage(file);

    //if they is a url from firebase send url to mongodb then hide the progress bar
    useEffect(() => {
        if (err) {
            setFile(null);
            setMessage(err);
        }
        if (url) {
            sendFile(url);
            setFile(null);
        }
    }, [err, url, setFile, sendFile, setMessage])
    //show progress bar
    return <div className='progress-bar' style={{width: progress + '%'}}></div>
}

export default ProgressBar;