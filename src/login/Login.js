import React, {useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {setDoc, doc } from "firebase/firestore"; 
import {db} from '../firebase/Firebase';
import './Login.scss';
import {auth} from '../firebase/Firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";

export const Login = ()=>{

    const navigate = useNavigate();
    const loginContainer = useRef();
    const checkEmailValid = useRef();
    const checkPwdValid = useRef();
    const checkConfirmPwdValid = useRef();


    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);
    
    // const {signup, login} = useAuth();

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

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


    useEffect(()=>{
        if(validateEmail(registerEmail)) {
            checkEmailValid.current.classList.add('show-tick');
        }else{
            checkEmailValid.current.classList.remove('show-tick');
        }
    }, [registerEmail])


    useEffect(()=>{
        if(registerPassword.length>=6) {
            checkPwdValid.current.classList.add('show-tick');
        }else{
            checkPwdValid.current.classList.remove('show-tick');
        }
    })

    useEffect(()=>{
        
        if(registerPassword.length!==0 && registerConfirmPassword === registerPassword){
            checkConfirmPwdValid.current.classList.add('show-tick');
        }
            
        else{
            checkConfirmPwdValid.current.classList.remove('show-tick');
        }
    }, [registerPassword, registerConfirmPassword])



    const showHidePassWord = ()=>{
        const passwordBox = document.querySelector('#password');
        const showHidePw = document.querySelector(".showHidePw");
        if(passwordBox.type === 'password'){
            passwordBox.type = 'text';
            showHidePw.classList.replace("uil-eye-slash", "uil-eye");
        }else{
            passwordBox.type = 'password';
            showHidePw.classList.replace("uil-eye", "uil-eye-slash");
        }
    }



    async function handleOnSumbitLogin(e){
        e.preventDefault();

        const email = e.target.email.value
        const password = e.target.password.value
        try{
            setLoginLoading(true);  
            login(email, password);
            navigate('/');
        } catch{
            console.error("failed to login")
        }
        setLoginLoading(false);
    }



    async function handleOnSumbitRegister(e) {
        e.preventDefault();

        const email = e.target.email.value
        const password = e.target.password.value
        const confirm = e.target.confirm.value

        if(!validateEmail(email)) {
            alert('Email Format is not correct');
            return;
        }
        if(password.length < 6) {
            alert('Password should be at least 6');
            return;
        }
        if(password !== confirm) {
            alert('Two password inconsistent');
            return;
        }

        try{
            setRegisterLoading(true);
            await signup(email, password);
            
        } catch{
            console.error("failed to signup");
        }

        try{
            console.log("preparing user's information...")

            const userInfo = {
                email: email,
                username: email.split('@')[0],
                createtime: new Date(),
                friends: [],
                isbanned: false,
                avatar: 'https://ui-avatars.com/api/?name='+ email.split('@')[0]
            }
            console.log(userInfo);

            await setDoc(doc(db, "user", email), userInfo);
        } catch{
            console.error("failed to add a user to database");
        }


        setRegisterLoading(false);
        navigate('/');
    }

    return(
        <div id='container' ref={loginContainer}>
            {/* Login */}
            <div id='forms'>
                <div id='login-container'>
                    <h1 className='title'>Sign in</h1>
                    <form className='form-group' onSubmit={(e)=>handleOnSumbitLogin(e)}>
                        <div className="form">
                            <input type="text" id="email" className="form__input" name='email'
                            autoComplete="off" placeholder='Enter your email' onChange={e=>setLoginEmail(e.target.value)}/>
                            <i className='uil uil-envelope icon'></i>
                        </div>
                        <div className="form">
                            <input type="password" id="password" className="form__input" name='password'
                            autoComplete="off" placeholder='Enter your password' onChange={e=>setLoginPassword(e.target.value)}/>
                            <i className='uil uil-lock icon'></i>
                            <i className='uil uil-eye-slash showHidePw' onClick={showHidePassWord}></i>
                        </div>
                        <div className="form">
                            <button type="submit" className="submit-btn">
                                {'Sign in'+(loginLoading?'...':'')}
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle signup' onClick={()=>{loginContainer.current.classList.add('active'); document.title='Register'}}>create an account here!</a>
                </div>



                {/* Register */}
                <div id='register-container'>
                    <h1 className='title'>{'Sign up'}</h1>
                    <form className='form-group' onSubmit={handleOnSumbitRegister}>
                        <div className="form">
                            <input type="text" id="email" className="form__input" name='email'
                            onChange={(e)=>setRegisterEmail(e.target.value)}
                            autoComplete="off" placeholder='Enter your email'/>
                            <i className='uil uil-envelope icon'></i>
                            <i className="uil uil-check" ref={checkEmailValid}></i>
                        </div>
                        <div className="form">
                            <input type="password" className="form__input" name='password'
                            onChange={(e)=>{setRegisterPassword(e.target.value)}}
                            autoComplete="off" placeholder='Enter your password (6 at least)'/>
                            <i className='uil uil-lock icon'></i>
                            {/* <i className='uil uil-eye-slash showHidePw' onClick={showHidePassWord}></i> */}
                            <i className="uil uil-check" ref={checkPwdValid}></i>
                        </div>
                        <div className="form">
                            <input type="password" id="confirm-password" className="form__input" name='confirm'
                            onChange={(e)=>{setRegisterConfirmPassword(e.target.value)}}
                            autoComplete="off" placeholder='Confirm your password'/>
                            <i className="uil uil-key-skeleton icon"></i>
                            {/* <i className='uil uil-eye-slash showHidePw' onClick={showHidePassWord}></i> */}
                            <i className="uil uil-check" ref={checkConfirmPwdValid}></i>
                        </div>
                        <div className="form">
                            <button type="submit" className="submit-btn" disabled={registerLoading}>
                                {'Sign up'+(registerLoading?'...':'')}
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle login' onClick={()=>{loginContainer.current.classList.remove('active');document.title='Login'}}>login here!</a>
                </div>
            </div>
        </div>
    )
}