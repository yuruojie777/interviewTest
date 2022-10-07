import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import './Login.scss'
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
    


    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


    /* Change page title according to the window */
    useEffect(() => {
        document.title = loginContainer.current.classList.contains('active')?'Register':'Login';
    },[]);


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
        const form = {
            type: 'signup',
            email: email,
            password: password
        }
        setLoginLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        setLoginLoading(false);
        console.log(form);
        document.cookie='user=xiaobinggan';
        navigate('/');
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
        const form = {
            type: 'signup',
            email: email,
            password: password
        }
        setRegisterLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        console.log(form)
        setRegisterLoading(false);
        document.cookie='user=xiaobinggan';
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
                            <button type="submit" id="submit" className="submit-btn">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle signup' onClick={()=>loginContainer.current.classList.add('active')}>create an account here!</a>
                    
                </div>







                {/* Register */}
                <div id='register-container'>
                    <h1 className='title'>Sign up</h1>
                    <form className='form-group' onSubmit={handleOnSumbitRegister}>
                        <div className="form">
                            <input type="text" id="email" className="form__input" name='email'
                            onChange={(e)=>setRegisterEmail(e.target.value)}
                            autoComplete="off" placeholder='Enter your email'/>
                            <i className='uil uil-envelope icon'></i>
                            <i className="uil uil-check" ref={checkEmailValid}></i>
                        </div>
                        <div className="form">
                            <input type="password" id="password" className="form__input" name='password'
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
                            <button type="submit" id="submit" className="submit-btn" disabled={!registerLoading}>
                                {'Sign up'+(registerLoading?'...':'')}
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle login' onClick={()=>loginContainer.current.classList.remove('active')}>login here!</a>
                </div>

            </div>
        </div>
    )
}