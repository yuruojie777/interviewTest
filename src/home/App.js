import './App.scss';
import {useState, useEffect} from 'react';
import ImageSlider from './ImageSlider';
import Post from './Post';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import {Link, useNavigate} from 'react-router-dom';
function App() {

  const [user, setUser] = useState('小饼干');
  const [login, setLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState('binggan.jpg');
  const navigate = useNavigate();
  // const [avatar, setAvatar] = useState('https://avatars.dicebear.com/api/male/john.svg?background=%230000ff');



  useEffect(()=>{
    let isCanceled = false;
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      if(isCanceled){
        console.log(json);
        setPosts(json);
      }
    })

    return ()=>{
      isCanceled = true;
    }
  },[])


  useEffect(()=>{
    // console.log("cookie is working!");
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
          <a href='#'><img src='logo-color.png'></img></a>
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
            <li><a href='#'>Tech</a></li>
            <li><a href='#'>Movie</a></li>
            <li><a href='#'>About</a></li>
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
        {/* Main */}
        {/* <span></span> */}
        {posts.slice(0,9).map(post=>{
          return <li key={post.id}><Post post={post}/></li>})
          }
        
      </main>
      <div id='sidebar'>
        <SideBar/>
      </div>
      <div id='content1'>
        {/* Content1 */}
      <ImageSlider/>
      </div>
      <div id='content2'>Content2</div>
      <div id='content3'>Content3</div>
      <footer>Footer</footer>
    </div>
    <div className='chatbox'>
      <ChatBox/>
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
