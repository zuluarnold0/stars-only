//local
import { firebaseStorage } from '../config/firebase';

export const addImageHelper = (file, setErr, setUrl)  => {

    //create file reference
    const storageRef = firebaseStorage.ref(file.name);

    //upload file, if error: set error and if url: set link to file
    storageRef
        .put(file)
        .on('state_changed', () => {}, 
        (error) => { setErr(error) }, 
        async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })
}