import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './Login.scss'
export const Login = ()=>{
    


    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Login';
    });

    const activateContainer = ()=>{
        const container = document.querySelector('#container');
        container.classList.add('active');
    }

    const disabledContainer = ()=>{
        const container = document.querySelector('#container');
        container.classList.remove('active');
    }
    



    const showHidePassWord = ()=>{
        const passwordBox = document.querySelector("#password");
        const showHidePw = document.querySelector(".showHidePw");
        if(passwordBox.type === 'password'){
            passwordBox.type = 'text';
            
            showHidePw.classList.replace("uil-eye-slash", "uil-eye");
        }else{
            passwordBox.type = 'password';
            showHidePw.classList.replace("uil-eye", "uil-eye-slash");
        }
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleOnSumbit(e){
        e.preventDefault();
        console.log('username is: '+username + ', and password is: ' + password);
        console.log('username is '+(username.length===0?'null':'not null'));
        console.log('password is '+(password.length===0?'null':'not null'));
        if(username === 'xiaobinggan' && password==='xiaobinggan') {
            document.cookie = ('user=xiaobinggan');
            navigate('/');
        }
    }

    return(
        <div id='container'>
            <div id='forms'>
                <div id='login-container'>
                    <h1 className='title'>Sign in</h1>
                    <form className='form-group' onSubmit={handleOnSumbit}>
                        <div className="form">
                            <input type="text" id="email" className="form__input"
                            autoComplete="off" placeholder='Enter your email' onChange={e=>setUsername(e.target.value)}/>
                            {/* <label htmlFor="email" className="form__label">
                                Email
                            </label> */}
                            <i className='uil uil-envelope icon'></i>
                        </div>
                        <div className="form">
                            <input type="password" id="password" className="form__input"
                            autoComplete="off" placeholder='Enter your password' onChange={e=>setPassword(e.target.value)}/>
                            {/* <label htmlFor="password" className="form__label">
                                Password
                            </label> */}
                            <i className='uil uil-lock icon'></i>
                            <i className='uil uil-eye-slash showHidePw' onClick={showHidePassWord}></i>
                        </div>
                        <div className="form">
                            <button type="submit" id="submit" className="submit-btn">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle signup' onClick={activateContainer}>create an account here!</a>
                    
                </div>

                <div id='register-container'>
                    <h1 className='title'>Sign up</h1>
                    <form className='form-group' onSubmit={handleOnSumbit}>
                        <div className="form">
                            <input type="text" id="email" className="form__input"
                            autoComplete="off" placeholder='Enter your email' onChange={e=>setUsername(e.target.value)}/>
                            {/* <label htmlFor="email" className="form__label">
                                Email
                            </label> */}
                            <i className='uil uil-envelope icon'></i>
                        </div>
                        <div className="form">
                            <input type="password" id="password" className="form__input"
                            autoComplete="off" placeholder='Enter your password' onChange={e=>setPassword(e.target.value)}/>
                            {/* <label htmlFor="password" className="form__label">
                                Password
                            </label> */}
                            <i className='uil uil-lock icon'></i>
                            <i className='uil uil-eye-slash showHidePw'></i>
                        </div>
                        <div className="form">
                            <button type="submit" id="submit" className="submit-btn">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <a href='#' className='toggle login' onClick={disabledContainer}>login here!</a>
                </div>
            </div>
        </div>
    )
}