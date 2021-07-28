//packages
import { useEffect, useState } from 'react';

//local
import { firebaseStorage } from '../config/firebase';

export const useStorage = file => {
    const [ url, setUrl ] = useState(null);
    const [ err, setErr ] = useState(null);
    const [ progress, setProgress ] = useState(0);

    useEffect(() => {
        //create file reference
        const storageRef = firebaseStorage.ref(file.name);

        //upload file getting file percentage, error message and the file link
        storageRef
            .put(file)
            .on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, 
            (error) => { 
                setErr(error) 
            }, 
            async () => {
                const url = await storageRef.getDownloadURL();
                setUrl(url);
            })
    }, [file]);

    return { url, err, progress }
}