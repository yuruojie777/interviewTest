// import logo from './logo.svg';
import { Avatar, Divider, rgbToHex } from '@mui/material';
import './App.css';
import { Contact } from './Contacts';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
function App() {

  return (
    <div>
      <div className='navigation'>
        
        <a href='/'>
        <img className='logo' src='logo-color.png'/>
        </a>
        <nav>
          <ul>
            <li className='navigation-list'><a href='blog'>Blog</a></li>
            <li className='navigation-list'><a href='tech'>Tech</a></li>
            <li className='navigation-list'><a href='movie'>Movie</a></li>
            <li className='navigation-list'><a href='about'>About</a></li>
          </ul>
        </nav>
        {/* <div className='avatar'>
          <Avatar sx={{bgcolor: 'orange', width: '200%', height: '200%'}}>R</Avatar>
        </div> */}
      </div>

      <Divider/>
      <div  className='wrapper'>
        {/* <Contact/> */}
        <Outlet/>
      </div>
      
    </div>
  );
}

export default App;
