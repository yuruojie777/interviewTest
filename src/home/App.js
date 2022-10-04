import './App.scss';
import {useState, useEffect} from 'react';
import ImageSlider from './ImageSlider';
import Post from './Post';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
function App() {

  const [user, setUser] = useState('小饼干');
  const [login, setLogin] = useState(true);
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState('binggan.jpg');
  // const [avatar, setAvatar] = useState('https://avatars.dicebear.com/api/male/john.svg?background=%230000ff');



  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      setPosts(json);
    })
  },[posts])

  function onHandleClickToggleButton(e){
    document.getElementsByClassName('navbar-links')[0].classList.toggle('active');
    if(!login) document.getElementsByClassName('sign-in-up-links')[0].classList.toggle('active');
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

        <span className='username'>{user}</span>
        <div className='avatar-img'>
          <img src={avatar}></img>
        </div>
      </nav>
      <main>
        {/* Main */}
        {/* <span></span> */}
        {posts.slice(0,10).map(post=>{
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
    
    </>
  );
}

export default App;
