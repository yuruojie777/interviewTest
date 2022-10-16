import React, {useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import './profile.scss'
import { useAuth } from '../context/AuthContext';
import {updateProfile } from "firebase/auth";
import { collection, doc, query, onSnapshot, where, updateDoc } from "firebase/firestore"; 
import {db} from '../firebase/Firebase';
export const Profile = () => {


    const {currentUser} = useAuth();
    const usernameRef = useRef();
    const photoUrlRef = useRef();
    const navigate = useNavigate();

    async function updateUserProfile(username, photoUrl){
        if(username.length === 0) {
            alert('Username cannot be null');
            return
        }
        updateProfile(currentUser, {
            displayName: username, photoURL: photoUrl
          }).then(() => {
            const q = query(collection(db, "user"), where("email", "==", currentUser.email));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((document) => {
                    const userRef = doc(db, "user", document.id);
                    updateDoc(userRef, {
                        username: username,
                        avatar: photoUrl
                    });
                });
            });
            

          }).catch((error) => {
            alert('Update failed');
          });
          navigate('/');
    }


    async function onClickUpdate(e){
        e.preventDefault();
        await updateUserProfile(usernameRef.current.value, photoUrlRef.current.value);
    }



  return (
    <div className='profile-container'>
        
        <h1>Profile</h1>

        <form onSubmit={(e)=>onClickUpdate(e)}>
            <div>
                <label>Username</label>
                <input ref={usernameRef}></input>
            </div>
            <div>
                <label>PhotoUrl</label>
                <input ref={photoUrlRef}></input>
            </div>

            <button type='submit'>Update</button>
        </form>
    </div>
  )
}
