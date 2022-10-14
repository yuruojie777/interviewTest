import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './home/App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Blog } from './blog/Blog';
import { Login } from './login/Login';
import {Tech} from './tech/Tech';
import {About} from './about/About';
import { AuthProvider } from './context/AuthContext';
import { Profile } from './profile/Profile';
import { Dashboard } from './home/Dashboard';
import { Tool } from './tool/Tool';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><App/></AuthProvider>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/blog",
        element: <Blog/>,
      },
      {
        path: "/tech",
        element: <Tech/>,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/tool",
        element: <Tool/>
      }
    ],
  },
  {
    path: "/login",
    element: <AuthProvider><Login/></AuthProvider>,
  },
  {
    path: "/profile",
    element: <AuthProvider><Profile/></AuthProvider>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
