import React, { useContext, useState, useEffect } from "react";
import {auth} from '../firebase/Firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import {Login} from '../login/Login'
import {Loading} from './Loading'


const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [uid, setUid] = useState('');
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });

    }

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setLoading(false)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }


    function logout() {
        signOut(auth).then(() => {
            setUid(0);
          }).catch((error) => {
          });
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('check user!!')
            if (user) {
              const uid = user.uid;
              setUid(uid);
              setCurrentUser(user);
              setLoading(false);
            } else {
            }
        });

        return unsubscribe;
    },[uid])



    const value = {
        currentUser,
        signup,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading?children:<Login/>}
        </AuthContext.Provider>
    )
}