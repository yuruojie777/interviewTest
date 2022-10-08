import './App.scss';
import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import {Outlet, useNavigate} from 'react-router-dom';
// initialize firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, query, orderBy, onSnapshot, where} from "firebase/firestore"; 


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
  const [darkTheme, setDarkTheme] = useState(true);


  const [userInfo, setUserInfo] = useState({})
  const [user, setUser] = useState('');
  const [login, setLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState('binggan.jpg');

  const navigate = useNavigate();

  const getUserInfo = async(email)=>{
    
      const userRef = collection(db, "user");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserInfo(doc.data());
        console.log(doc.id, " => ", doc.data());
      });

      setLogin(true);
    
  }


  useEffect(()=>{
    const email = localStorage.getItem('user')
    if(email!=null){
      getUserInfo(email);
    }
  },[])



  function onHandleClickToggleButton(e){
    document.getElementsByClassName('navbar-links')[0].classList.toggle('active');
    if(!login) document.getElementsByClassName('sign-in-up-links')[0].classList.toggle('active');
  }


  function onClickAvatarButton(){
    const dropdown = document.getElementsByClassName('drop-down-menu')[0]
    if(dropdown.classList.contains('show-dropdown')) dropdown.classList.remove('show-dropdown');
    else dropdown.classList.add('show-dropdown');
  }

  function logout(){
    // document.cookie = "user=xiaobinggan ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("user");
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
            <li><a href='movie'>Tool</a></li>
            <li><a href='about'>About</a></li>
          </ul>
        </div>

        {
          login?<></>:(<div className='sign-in-up-links'>
          <ul>
            <li><a href='login'>login</a></li>
            <li><a href='register'>register</a></li>
          </ul>
        </div>)
        }

        <span className='username'>{login?userInfo.username:'未登录'}</span>
        <div className='avatar-img' onClick={onClickAvatarButton}>
          {/* <img src={login?avatar:'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'}></img> */}
          <img src={login?userInfo.avatar:'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'}></img>
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
      <ChatBox currentUser={userInfo}/>
    </div>


    {
      login?    
      <div className='drop-down-menu'>
        <li><a>Setting</a></li>
        <li><a>Profile</a></li>
        <li onClick={e=>{logout();setLogin(false);navigate('/login')}}><a>Logout</a></li>
      </div>:''
    }


    </>
  );
}

export default App;
