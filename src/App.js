// import logo from './logo.svg';
import { Divider } from '@mui/material';
import './App.css';
import { Contact } from './Contacts';

function App() {
  return (
    <div>
      <div className='navigation'>
        <div className='logo'>
        </div>
        <div>
          <nav>
            <ul>
              <li><a href='blog'>Blog</a></li>
              <li><a href='tech'>Tech</a></li>
              <li><a href='movie'>Movie</a></li>
              <li><a href='about'>About</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <Divider/>
      <div  className='wrapper'>
        <Contact/>
      </div>
    </div>
  );
}

export default App;
