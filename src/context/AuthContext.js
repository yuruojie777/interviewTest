import React, { useContext, useState, useEffect } from "react";
import {auth} from '../firebase/Firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import {Login} from '../login/Login'
const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {


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
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('i am alive')
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setCurrentUser(user);
              // ...
            } else {
              // User is signed out
              // ...
            }
        });

        return unsubscribe;
    },[])



    const value = {
        currentUser,
        signup,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}