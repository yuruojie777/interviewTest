import React, { useContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase/Firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";


const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.error(errorMessage);
        });

    }

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.error(errorMessage)
        });
    }


    function logout() {
        signOut(auth).then(() => {
          }).catch((error) => {
          });
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoading(false);
              setCurrentUser(user);
            } else {
                navigate('/login');
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
            {!loading?children:<></>}
        </AuthContext.Provider>
    )
}