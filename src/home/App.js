import './App.scss';
import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import {Outlet, useNavigate} from 'react-router-dom';
// initialize firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, query, orderBy, onSnapshot, where} from "firebase/firestore"; 
import { useAuth } from '../context/AuthContext';

const firebaseConfig = {
  apiKey: "AIzaSyAxsKt9f2cpo8MM243ZuOT_QZ_jKmmlpdU",
  authDomain: "test-for-yuruojie.firebaseapp.com",
  projectId: "test-for-yuruojie",
  storageBucket: "test-for-yuruojie.appspot.com",
  messagingSenderId: "547159601573",
  appId: "1:547159601573:web:1a19221d336a867a6b784c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const ThemeContext = React.createContext();


function App() {


  document.title=`Ruojie's Website`;
  const {currentUser, logout} = useAuth();

  const [userInfo, setUserInfo] = useState({})
  const login = currentUser!==undefined;

  const navigate = useNavigate();


  function onHandleClickToggleButton(e){
    document.getElementsByClassName('navbar-links')[0].classList.toggle('active');
    if(!login) document.getElementsByClassName('sign-in-up-links')[0].classList.toggle('active');
  }


  function onClickAvatarButton(){
    if(currentUser!=undefined){
      const dropdown = document.getElementsByClassName('drop-down-menu')[0]
      if(dropdown.classList.contains('show-dropdown')) dropdown.classList.remove('show-dropdown');
      else dropdown.classList.add('show-dropdown');
    }
  }

  function onHandleLogout(){
    logout();
    navigate('/login')
  }


  function getFriendList() {

  }




  return (
    <>
    <div className='container'>
      <nav className='navbar'>
        <div className='brand-title'>
          <a href='/'><img src='logo-color.png'></img></a>
        </div>
        <a href='#' className='my-toggle-button' 
        onClick={onHandleClickToggleButton}>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </a>
        <div className='navbar-links'>
          <ul>
            <li><a href='blog'>Blog</a></li>
            <li><a href='tech'>Tech</a></li>
            <li><a href='#'>Tool</a></li>
            <li><a href='about'>About</a></li>
          </ul>
        </div>

        {
          login?<></>:(<div className='sign-in-up-links'>
          <ul>
            <li><a href='login'>login</a></li>
            <li><a href='login'>register</a></li>
          </ul>
        </div>)
        }

        <span className='username'>{(currentUser && currentUser.displayName)}</span>
        <div className='avatar-img' onClick={onClickAvatarButton}>
          {currentUser!==undefined?
          (currentUser.photoURL!==null?<img src={currentUser.photoURL}></img>:<img src='https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'></img>):
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAodJREFUWEfdmNFx2zAMhoHzET4/NRs0naDJBHE3cCaoPUHSCeoR0gliT9Bu0GaC2hvYGzRPPlPioQcf1ZMokYIUtecGL7rkRPDTDxAAjXBmhmfGA68DyFp7BQAfAUCeF/4pYm8A4Jd/rolI/u5knRSy1s4B4DMAXCp32QHAkojWyvd1IcuybMrMjx1Awv13iLgwxvxoA2tVyKsiMEPYgohWKUdJIGutLJZcGdJWRLSIOYwCDaxMuH9UqUYgnzPfh5Ql9IWIH5pyqhHIWiun460SaAsARbJOAeC9ct2OiN7VQMN/dAjVMzPPx+Pxt7KP4/E4Q0TJvTcKsFroagpp1WHm2xCmAPBQXxVANZUqQL4C/1Q42hKRVOmoWWulSmvCd12u6CHQAwDcKYC+ENF9C1AvXyGQJOfNPwZ6IiI5DCcLgbQyb4joeqCQVXyFQKxQ5/TKQEl98kVEfzh6A8mYwcyLyLGX3idjicpSQNqQlTeSNeXCmDx9DYSVE9s3qVVfrnwpmdTao1reS1qHTIliEiZN7Smvr5SQPoXxGQBWzrmHyWQiPa9mh8PhcjQaSZ2SCbOthcQLo3huaR1b59wsBhKSeTDpdTHV9kRUGYebepl8VdOEuDXGTBGxCI8qRZj5IssySfomqPbmmlBpZYz51Acoz/NHZp4FX1BTp1apiwWJAW3jnLvtGDLp+rVS0GlA8yrFQgeIuMzzfN2S1NKkYw242whbKKUY8jeIKCetuBBeMbOokbq3yQVSPrbR/q9rUJBTMpZq5+zw6/eIOB/kolj27OftZQewvb9KJy+H5T1aQ9YUaD/qSh4UPzYUNaZoI5JTciH8uz82qCrhC1/qpdAL90wuPzug33ZzJjTEWazEAAAAAElFTkSuQmCC"></img>
          }
        </div>
      </nav>

      
      <main>
          <Outlet/>
      </main>
      <div id='sidebar'>
        <SideBar/>
      </div>
      <footer>Copyright © yuruojie777@gmail.com</footer>
    </div>


    <div className='chatbox'>
      {login?<ChatBox currentUser={currentUser}/>:''}
    </div>


    {
      login?    
      <div className='drop-down-menu'>
        <li><a>Setting</a></li>
        <li><a href='profile'>Profile</a></li>
        <li onClick={e=>{onHandleLogout();}}><a>Logout</a></li>
      </div>:''
    }
    </>
  );
}

export default App;
