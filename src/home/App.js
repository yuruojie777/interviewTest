import './App.scss';
import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import {Outlet, useNavigate} from 'react-router-dom';
// initialize firestore
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';
import { Contact } from '../contact/Contact';
import { Tool } from '../tool/Tool';
import {Blog} from '../blog/Blog';
import {Tech} from '../tech/Tech';
import {About} from '../about/About';
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
  const [userInfo, setUserInfo] = useState({});
  const [login, setLogin] = useState(false);
  const [currentContent, setCurrentContent] = useState('main');
  const navigate = useNavigate();


  function onHandleClickToggleButton(e){
    document.getElementsByClassName('navbar-links')[0].classList.toggle('active');
    if(!login) document.getElementsByClassName('sign-in-up-links')[0].classList.toggle('active');
  }


  function onClickAvatarButton(){
    if(currentUser!==undefined){
      const dropdown = document.getElementsByClassName('drop-down-menu')[0]
      if(dropdown.classList.contains('show-dropdown')) dropdown.classList.remove('show-dropdown');
      else dropdown.classList.add('show-dropdown');
    }
  }

  function onHandleLogout(){
    logout();
    
    navigate('/login')
  }


  function onClickLink(e){
    // console.log(e.target.text);
    setCurrentContent(e.target.text);
    document.getElementsByClassName('blog-link')[0].classList.add('active');
    switch(e.target.text){
      case 'Blog':
        document.getElementsByClassName('blog-link')[0].classList.add('active');
        document.getElementsByClassName('tech-link')[0].classList.remove('active');
        document.getElementsByClassName('tool-link')[0].classList.remove('active');
        document.getElementsByClassName('about-link')[0].classList.remove('active');
        break;
      case 'Tech':
        document.getElementsByClassName('blog-link')[0].classList.remove('active');
        document.getElementsByClassName('tech-link')[0].classList.add('active');
        document.getElementsByClassName('tool-link')[0].classList.remove('active');
        document.getElementsByClassName('about-link')[0].classList.remove('active');
        break;
      case 'Tool':
        document.getElementsByClassName('blog-link')[0].classList.remove('active');
        document.getElementsByClassName('tech-link')[0].classList.remove('active');
        document.getElementsByClassName('tool-link')[0].classList.add('active');
        document.getElementsByClassName('about-link')[0].classList.remove('active');
        break;
      case 'About':
        document.getElementsByClassName('blog-link')[0].classList.remove('active');
        document.getElementsByClassName('tech-link')[0].classList.remove('active');
        document.getElementsByClassName('tool-link')[0].classList.remove('active');
        document.getElementsByClassName('about-link')[0].classList.add('active');
        break;
      default:
        break;
    }
  }


  function getMainContent(){
    // console.log(currentContent);
    switch(currentContent){
      case 'Blog':
        return <Blog></Blog>
      case 'Tech':
        return <Tech></Tech>
      case 'Tool':
        return <Tool></Tool>
      case 'About':
        return <About></About>
      default:
        return <></>
    }

  }

  useEffect(()=>{
    async function getUserInfo(email){
      if(currentUser!==undefined){
        const userRef = doc(db, "user", email);
        const userSnap = await getDoc(userRef);
  
  
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    }


    getUserInfo(currentUser.email);
    setLogin(true);

  },[currentUser])


  return (
   <div>
       <div className='container'>
         <nav className='navbar'>
           <div className='brand-title'>
             <a href='/'><img src='logo-color.png' alt=''></img></a>
           </div>
           <a className='my-toggle-button' 
          onClick={onHandleClickToggleButton}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </a>
          <div className='navbar-links'>
            <ul>
              <li className='blog-link'>
                <a onClick={e=>onClickLink(e)}>Blog</a>
              </li>
              <li className='tech-link'>
                <a onClick={e=>onClickLink(e)}>Tech</a>
              </li>
              <li className='tool-link'>
                <a onClick={e=>onClickLink(e)}>Tool</a>
              </li>
              <li className='about-link'>
                <a onClick={e=>onClickLink(e)}>About</a>
              </li>
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
  
          <span className='username'>{userInfo.username}</span>
          <div className='avatar-img' onClick={onClickAvatarButton}>
            <img src={userInfo.avatar}></img>
          </div>
        </nav>
  
        
        <main id='main'>
            {/* <Outlet/> */}
            {
              getMainContent()
            }
        </main>
        <div id='sidebar'>
          <SideBar/>
        </div>
        <footer>Copyright © yuruojie777@gmail.com</footer>
      </div>
  
  
      <div className='chatbox'>
        <ChatBox currentUser={currentUser}/>
      </div>
  
  
      <div className='contact'>
      <Contact currentUser={currentUser}/>
      </div>
  
      {
        login?    
        <div className='drop-down-menu'>
          <li><a>Setting</a></li>
          <li><a href='profile'>Profile</a></li>
          <li onClick={e=>{onHandleLogout();}}><a>Logout</a></li>
        </div>:''
      }
    </div>
  );
}

export default App;
