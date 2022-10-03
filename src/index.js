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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      // {
      //   path: "/contacts",
      //   element: <Contact />,
      // },
      // {
      //   path: "/blog",
      //   element: <Blog/>,
      // },
      // {
      //   path: "/tech",
      //   element: <Tech/>,
      // },
      // {
      //   path: "/movie",
      //   element: <Movie/>,
      // },
      // {
      //   path: "/about",
      //   element: <About/>
      // }
    ],
  },
  {
    path: "/blog",
    element: <Blog/>,
  },
  {
    path: "/login",
    element: <Login/>,
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
