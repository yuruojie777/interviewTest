import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './home/App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Blog } from './blog/Blog';
import { Login } from './login/Login';
import {Tech} from './tech/Tech';
import {About} from './about/About';
import { AuthProvider } from './context/AuthContext';
import { Profile } from './profile/Profile';
import { Dashboard } from './home/Dashboard';
import { Tool } from './tool/Tool';
import { Yuruojie } from './Yuruojie';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><App/></AuthProvider>,
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
reportWebVitals();
