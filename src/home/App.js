import './App.scss';
import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import {Outlet, useNavigate} from 'react-router-dom';


export const ThemeContext = React.createContext();
function App() {

  const [darkTheme, setDarkTheme] = useState(true);


  const [user, setUser] = useState('小饼干');
  const [login, setLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState('binggan.jpg');
  const navigate = useNavigate();


  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://jsonplaceholder.typicode.com/posts', {signal})
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setPosts(json);
    }).catch(err=>{
      if(err.name === 'AbortError'){
        console.log('cancelled!');
      }else{
        //handle errors
      }
    })

    return ()=>{
      controller.abort();
    }
  },[])


  useEffect(()=>{
    const cookies = document.cookie.split(';');
    for(var i=0; i < cookies.length; i++){
      if(cookies[i] === 'user=xiaobinggan'){
        setLogin(true);
      }
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
    document.cookie = "user=xiaobinggan ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
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

        <span className='username'>{login?user:'未登录'}</span>
        <div className='avatar-img' onClick={onClickAvatarButton}>
          <img src={login?avatar:'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'}></img>
        </div>
      </nav>

      
      <main>
        {/* {posts.slice(0,9).map(post=>{
          return <li key={post.id}><Post post={post}/></li>})
          } */}
          <Outlet/>
      </main>
      <div id='sidebar'>
        <SideBar/>
      </div>
      <footer>Copyright © yuruojie777@gmail.com</footer>
    </div>


    <div className='chatbox'>
    <ThemeContext.Provider value={darkTheme}>
      <ChatBox/>
    </ThemeContext.Provider>
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
