import { Avatar, Divider, rgbToHex } from '@mui/material';
import './App.css';
import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { color } from '@mui/system';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
function App() {


  return (
    <div>

      <div className='navigation'>
        <nav>
          <ul>
            <li className='navigation-list'>
              <a href='/'>
                <img src='logo.png'/>
              </a>
            </li>
            <li className='navigation-list'><a href='blog'>Blog</a></li>
            <li className='navigation-list'><a href='tech'>Tech</a></li>
            <li className='navigation-list'><a href='movie'>Movie</a></li>
            <li className='navigation-list'><a href='about'>About</a></li>
          </ul>
        </nav>
      </div>

      <div className='tools'>
          <ul className='tool-list'>
          <li>
            <Fab color="primary" aria-label="add" size='small'>
            <AddIcon />
            </Fab>
          </li>
          <li>
            <Fab color="secondary" aria-label="edit" size='small'>
            <EditIcon />
            </Fab>
          </li>
          </ul>
        </div>
      <div  className='wrapper'>
        <div className='left-space'></div>
        <div className='content'>
          <Outlet/>
        </div>
        <div className='ad'></div>
      </div>

    </div>
  );
}

export default App;
